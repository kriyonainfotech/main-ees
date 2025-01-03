import React, { useCallback } from 'react';
import bellSound from '../../public/bell.mp3'; // Import your sound file
import { Link } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';

const BellNotification = () => {
    // Use useCallback to memoize the function and avoid unnecessary re-creation
    const playSound = useCallback(() => {
        const sound = new Audio(bellSound); // Create a new Audio object
        sound.play().catch((error) => {
            console.error("Error playing sound:", error); // Handle playback errors
        });
    }, []); // Empty dependency array ensures this function is not recreated unnecessarily

    return (
        <>
            <Link onClick={playSound} title="Notifications" aria-label="Notifications">
                <FiBell className="fs-4 fw-bold" />
            </Link>
        </>
    );
};

export default BellNotification;
