import React from 'react';
import { LocationOn } from '@mui/icons-material';
import "../styles/TrendsCard.css";

function TrendsCard(props) {
    const { state, district, commodity, minPrice, maxPrice, modalPrice } = props;

    const isModalPriceCloseToMax = modalPrice >= maxPrice * 0.9; // Adjust the threshold as needed

    return (
        <div className='trends-card'>
            <h2>{commodity}</h2>
            <p><LocationOn /> {district}, {state}</p>
            <p>Min Price: {minPrice}</p>
            <p>Max Price: {maxPrice}</p>
            <p className={`modal-price ${isModalPriceCloseToMax ? "price-increase" : "price-decrease"}`}>
                Modal Price: {modalPrice}
                {isModalPriceCloseToMax ? <span>&uarr;</span> : <span>&darr;</span>}
            </p>
        </div>
    );
}

export default TrendsCard;