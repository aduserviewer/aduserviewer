import Axios, { AxiosResponse } from "axios";
import * as _ from "lodash";

import { UserEntity, SortOptions } from "../../model";
import { uuidv4 } from "../../util";

/**
 * Function for retrieving user records from a REST API. Retrieves 100
 * records. Results are converted into the client side model, and sorted
 * according to the sort options parameter this method expects.
 *
 * @param sortOptions The sorting behavior to use for the returned results.
 */
export const getUsers = async (
    sortOptions: SortOptions
): Promise<UserEntity[]> => {
    const amount = 100;
    const usersUrl = `/api/?ext&amount=${amount}`;

    const usersApiResponse = await Axios.get<UserEntity[]>(usersUrl);
    const users = mapUserApiToModel(usersApiResponse, sortOptions);

    return users;
};

/**
 * Converts user records from API to client side model, and sorts them
 * according to the provided sort options.
 *
 * Conversion behaviors include:
 * -Stripping sensitive or non-essential data from the API result
 * -Assigning a GUID to each record
 * -Capitalizing the first letter of the 'gender' attribute
 * -Attempts to correct what appear to be errors in firstName/lastName values
 *
 * @param param0 The data to be converted
 * @param sortOptions The sorting behavior to use for the returned results.
 */
const mapUserApiToModel = (
    { data }: AxiosResponse<any[]>,
    sortOptions: SortOptions
): UserEntity[] => {
    const mappedData = data.map(userApi => {
        const user = {
            id: uuidv4(),
            firstName: userApi.name,
            lastName: userApi.surname,
            gender: _.startCase(userApi.gender),
            region: userApi.region,
            phone: userApi.phone,
            email: userApi.email,
            photoUrl: userApi.photo
        };

        // A small amount of the user data appears to have missing first name fields,
        // with what appears to be the first name prepended to the front of the
        // last name field. As a crude UI fix, split the first token of the last name
        // off into the first name field, if first name is absent
        let tokens: string[];
        if (!user.firstName && (tokens = user.lastName.split(" ")).length > 1) {
            user.firstName = tokens.shift();
            user.lastName = tokens.join(" ");
        }

        return user;
    });

    const sortedData = _.orderBy(
        mappedData,
        sortOptions.attribute,
        sortOptions.direction
    );

    return sortedData;
};
