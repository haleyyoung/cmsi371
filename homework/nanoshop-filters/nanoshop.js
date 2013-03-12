/*
 * This is a very simple module that demonstrates rudimentary,
 * pixel-level image processing.
 */
var Nanoshop = {
    /*
     * Applies the given filter to the given ImageData object,
     * then modifies its pixels according to the given filter.
     *
     * A filter is a function (r, g, b, a) that returns another
     * pixel as a 4-element array representing an RGBA value.
     */
    // JD: The addition of the color parameter is noted and generally
    //     done well.  But, to expand this a bit further, this can be
    //     generalized into a broader-purpose "options" object, so that
    //     you can support a variety of filters with different parameters.
    applyFilter: function (imageData, filter, color) {
        // For every pixel, replace with something determined by the filter.
        var i,
            j,
            max,
            pixel,
            pixelArray = imageData.data;

        for (i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            pixel = filter(pixelArray[i], pixelArray[i + 1], pixelArray[i + 2], pixelArray[i + 3], color);
            for (j = 0; j < 4; j += 1) {
                pixelArray[i + j] = pixel[j];
            }
        }

        return imageData;
    }
};

// Possible filters to choose from
// JD: Ack---these are supposed to go *inside* Nanoshop.
//     No need to pollute the global namespace with these!
var basicDarkener = function (r, g, b, a) {
        return [r / 2, g / 2, b / 2, a];
    },

    // This creates the effect of graying out every color except for the ones
    // you want to stand out. For the color parameter, pick "red", "green" or
    // "blue".
    colorAccentuate = function (r, g, b, a, color) {
        // Britain Southwick gave me the idea to average the colors for grayscale
        var average = (r + g + b) / 3;
        switch (color) {
        case "red":
            if (r >= g && r >= b) {
                return [r, g, b, a];
            }
            break;
        case "green":
            if (g >= r && g >= b) {
                return [r, g, b, a];
            }
            break;
        case "blue":
            if (b >= r && b >= g) {
                return [r, g, b, a];
            }
            break;
        }
        return [average, average, average, a];
    },

    // This turns all of the colors into shades of red, green and blue. The
    // primary colors of graphics, that is.
    primaryColors = function (r, g, b, a) {
        if (r >= g && r >= b) {
            return [r, 0, 0, a];
        } else if (g >= r && g >= b) {
            return [0, g, 0, a];
        }
        return [0, 0, b, a];
    };
