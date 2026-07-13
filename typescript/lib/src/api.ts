import * as interface_ from "./interface/api.js"

import * as r_json_with_parse_info_from_list_of_characters from "./_implementation/refiners/json_with_parse_info/list_of_characters.js"
import * as ser_json_without_guaranteed_unique_keys_to_list_of_characters from "./_implementation/serializers/json_without_guaranteed_unique_keys.js"
import * as ser_json_with_guaranteed_unique_keys_to_list_of_characters from "./_implementation/serializers/json_with_guaranteed_unique_keys.js"

export const api: interface_.API = {
    'serializers': {
        'json without unique keys': {
            'Document': ser_json_without_guaranteed_unique_keys_to_list_of_characters.Document,
        },
        'json with unique keys': {
            'Document': ser_json_with_guaranteed_unique_keys_to_list_of_characters.Document,
        }
    },
    'transformers': {


    },
    'refiners': {
        'json with parse info': {
            'list of characters': {

                'Value': r_json_with_parse_info_from_list_of_characters.Value,
            }
        }
    }
}