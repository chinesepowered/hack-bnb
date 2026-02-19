// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HackBnB - Decentralized Accommodation Marketplace
 * @notice A decentralized Airbnb on BNB Chain with escrow bookings and onchain reviews
 */
contract HackBnB {
    // ──────────────────────────────────────────────
    // Types
    // ──────────────────────────────────────────────

    enum BookingStatus { Confirmed, Completed, Cancelled, Disputed }

    struct Property {
        uint256 id;
        address payable owner;
        string name;
        string location;
        string description;
        string imageURI;
        uint256 pricePerNight; // in wei
        bool isActive;
        uint256 totalBookings;
        uint256 totalRating;
        uint256 reviewCount;
    }

    struct Booking {
        uint256 id;
        uint256 propertyId;
        address payable guest;
        uint256 checkIn;
        uint256 checkOut;
        uint256 totalPrice;
        BookingStatus status;
        bool reviewed;
    }

    struct Review {
        address reviewer;
        uint256 bookingId;
        uint256 rating;
        string comment;
        uint256 timestamp;
    }

    // ──────────────────────────────────────────────
    // State
    // ──────────────────────────────────────────────

    address public owner;
    uint256 public platformFeeBps = 250; // 2.5%
    uint256 public propertyCount;
    uint256 public bookingCount;

    mapping(uint256 => Property) public properties;
    mapping(uint256 => Booking) public bookings;
    mapping(uint256 => Review[]) public propertyReviews;
    mapping(address => uint256[]) public userProperties;
    mapping(address => uint256[]) public userBookings;

    // ──────────────────────────────────────────────
    // Events
    // ──────────────────────────────────────────────

    event PropertyListed(uint256 indexed id, address indexed host, string name, uint256 pricePerNight);
    event PropertyUpdated(uint256 indexed id);
    event PropertyToggled(uint256 indexed id, bool isActive);
    event BookingCreated(uint256 indexed id, uint256 indexed propertyId, address indexed guest, uint256 totalPrice);
    event BookingCompleted(uint256 indexed id);
    event BookingCancelled(uint256 indexed id, address cancelledBy);
    event ReviewSubmitted(uint256 indexed propertyId, uint256 indexed bookingId, address indexed reviewer, uint256 rating);

    // ──────────────────────────────────────────────
    // Modifiers
    // ──────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "Not platform owner");
        _;
    }

    // ──────────────────────────────────────────────
    // Constructor
    // ──────────────────────────────────────────────

    constructor() {
        owner = msg.sender;
    }

    // ──────────────────────────────────────────────
    // Property Management
    // ──────────────────────────────────────────────

    function listProperty(
        string calldata _name,
        string calldata _location,
        string calldata _description,
        string calldata _imageURI,
        uint256 _pricePerNight
    ) external returns (uint256) {
        require(bytes(_name).length > 0, "Name required");
        require(_pricePerNight > 0, "Price must be > 0");

        propertyCount++;
        properties[propertyCount] = Property({
            id: propertyCount,
            owner: payable(msg.sender),
            name: _name,
            location: _location,
            description: _description,
            imageURI: _imageURI,
            pricePerNight: _pricePerNight,
            isActive: true,
            totalBookings: 0,
            totalRating: 0,
            reviewCount: 0
        });

        userProperties[msg.sender].push(propertyCount);
        emit PropertyListed(propertyCount, msg.sender, _name, _pricePerNight);
        return propertyCount;
    }

    function toggleProperty(uint256 _propertyId) external {
        Property storage p = properties[_propertyId];
        require(p.owner == msg.sender, "Not property owner");
        p.isActive = !p.isActive;
        emit PropertyToggled(_propertyId, p.isActive);
    }

    // ──────────────────────────────────────────────
    // Booking
    // ──────────────────────────────────────────────

    function bookProperty(
        uint256 _propertyId,
        uint256 _checkIn,
        uint256 _checkOut
    ) external payable returns (uint256) {
        Property storage p = properties[_propertyId];
        require(p.isActive, "Property not active");
        require(p.id != 0, "Property does not exist");
        require(_checkOut > _checkIn, "Invalid dates");
        require(msg.sender != p.owner, "Cannot book own property");

        uint256 nights = (_checkOut - _checkIn) / 1 days;
        require(nights > 0, "Minimum 1 night");

        uint256 totalPrice = nights * p.pricePerNight;
        require(msg.value >= totalPrice, "Insufficient payment");

        bookingCount++;
        bookings[bookingCount] = Booking({
            id: bookingCount,
            propertyId: _propertyId,
            guest: payable(msg.sender),
            checkIn: _checkIn,
            checkOut: _checkOut,
            totalPrice: totalPrice,
            status: BookingStatus.Confirmed,
            reviewed: false
        });

        p.totalBookings++;
        userBookings[msg.sender].push(bookingCount);

        // Transfer: host gets (100% - fee), platform gets fee
        uint256 fee = (totalPrice * platformFeeBps) / 10000;
        p.owner.transfer(totalPrice - fee);

        // Refund overpayment
        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }

        emit BookingCreated(bookingCount, _propertyId, msg.sender, totalPrice);
        return bookingCount;
    }

    function completeBooking(uint256 _bookingId) external {
        Booking storage b = bookings[_bookingId];
        require(b.id != 0, "Booking does not exist");
        require(
            b.guest == msg.sender || properties[b.propertyId].owner == msg.sender,
            "Not authorized"
        );
        require(b.status == BookingStatus.Confirmed, "Not confirmed");

        b.status = BookingStatus.Completed;
        emit BookingCompleted(_bookingId);
    }

    function cancelBooking(uint256 _bookingId) external {
        Booking storage b = bookings[_bookingId];
        require(b.id != 0, "Booking does not exist");
        require(b.status == BookingStatus.Confirmed, "Not confirmed");
        require(
            b.guest == msg.sender || properties[b.propertyId].owner == msg.sender,
            "Not authorized"
        );

        b.status = BookingStatus.Cancelled;
        emit BookingCancelled(_bookingId, msg.sender);
    }

    // ──────────────────────────────────────────────
    // Reviews
    // ──────────────────────────────────────────────

    function submitReview(
        uint256 _bookingId,
        uint256 _rating,
        string calldata _comment
    ) external {
        Booking storage b = bookings[_bookingId];
        require(b.guest == msg.sender, "Only guest can review");
        require(b.status == BookingStatus.Completed, "Booking not completed");
        require(!b.reviewed, "Already reviewed");
        require(_rating >= 1 && _rating <= 5, "Rating must be 1-5");

        b.reviewed = true;

        Property storage p = properties[b.propertyId];
        p.totalRating += _rating;
        p.reviewCount++;

        propertyReviews[b.propertyId].push(Review({
            reviewer: msg.sender,
            bookingId: _bookingId,
            rating: _rating,
            comment: _comment,
            timestamp: block.timestamp
        }));

        emit ReviewSubmitted(b.propertyId, _bookingId, msg.sender, _rating);
    }

    // ──────────────────────────────────────────────
    // View Functions
    // ──────────────────────────────────────────────

    function getProperty(uint256 _id) external view returns (Property memory) {
        return properties[_id];
    }

    function getBooking(uint256 _id) external view returns (Booking memory) {
        return bookings[_id];
    }

    function getPropertyReviews(uint256 _propertyId) external view returns (Review[] memory) {
        return propertyReviews[_propertyId];
    }

    function getUserProperties(address _user) external view returns (uint256[] memory) {
        return userProperties[_user];
    }

    function getUserBookings(address _user) external view returns (uint256[] memory) {
        return userBookings[_user];
    }

    function getAllProperties() external view returns (Property[] memory) {
        Property[] memory allProps = new Property[](propertyCount);
        for (uint256 i = 1; i <= propertyCount; i++) {
            allProps[i - 1] = properties[i];
        }
        return allProps;
    }

    // ──────────────────────────────────────────────
    // Platform Admin
    // ──────────────────────────────────────────────

    function setPlatformFee(uint256 _feeBps) external onlyOwner {
        require(_feeBps <= 1000, "Fee too high"); // Max 10%
        platformFeeBps = _feeBps;
    }

    function withdrawPlatformFees() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}
