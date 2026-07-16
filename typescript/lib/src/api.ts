import * as interface_ from "./interface/api.js"

import * as r_json_with_parse_info_from_list_of_characters from "./modules/deserialization/implementation/refiners/model/list_of_characters.js"
import * as ser_json_without_guaranteed_unique_keys_to_list_of_characters from "./modules/serialization/implementation/transformers/without_guaranteed_unique_keys/paragraph.js"
import * as ser_json_with_guaranteed_unique_keys_to_list_of_characters from "./modules/serialization/implementation/transformers/with_guaranteed_unique_keys/paragraph.js"

export const api: interface_.API = {
    'serializers': {
    },
    'transformers': {

        'json without unique keys': {
            'paragraph': {

                'Document': ser_json_without_guaranteed_unique_keys_to_list_of_characters.Document,
            }
        },
        'json with unique keys': {
            'paragraph': {

                'Document': ser_json_with_guaranteed_unique_keys_to_list_of_characters.Document,
            }
        }

    },
    'refiners': {
        'json with parse info': {
            'list of characters': {

                'Value': r_json_with_parse_info_from_list_of_characters.Value,
            }
        }
    }
}