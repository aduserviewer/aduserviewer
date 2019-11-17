/**
 * Utility function for generating UUIDs, RFC4122 version 4 compliant
 *
 * Solution taken from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 *
 * @returns string UUID
 */
export const uuidv4 = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
