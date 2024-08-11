// Converts from degrees to radians.
function toRadians(degrees: number) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
function toDegrees(radians: number) {
    return radians * 180 / Math.PI;
}


export function bearing(startLat: number, startLng: number, destLat: number, destLng: number) {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    return (brng + 360) % 360;
}

export const degreesArrow = (degrees: number) => {
    if (degrees >= 337.5 || degrees < 22.5) {
        return "↑"
    } else if (degrees >= 22.5 && degrees < 67.5) {
        return "↗"
    }
    else if (degrees >= 67.5 && degrees < 112.5) {
        return "→"
    }
    else if (degrees >= 112.5 && degrees < 157.5) {
        return "↘"
    }
    else if (degrees >= 157.5 && degrees < 202.5) {
        return "↓"
    }
    else if (degrees >= 202.5 && degrees < 247.5) {
        return "↙"
    }
    else if (degrees >= 247.5 && degrees < 292.5) {
        return "←"
    }
    else if (degrees >= 292.5 && degrees < 337.5) {
        return "↖"
    }
}