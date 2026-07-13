import * as p_t from 'pareto-core/interface/transformer'
import * as p_r from 'pareto-core/interface/refiner'
import * as p_s from 'pareto-core/implementation/serializer'

//schemas
import * as s_deserialize_json from "./schemas/deserialize_json.js"
import * as s_list_of_characters from "./schemas/list_of_characters.js"
import * as s_json_with_guaranteed_unique_keys from "./schemas/json_with_guaranteed_unique_keys.js"
import * as s_json_with_parse_info from "./schemas/json_with_parse_info.js"
import * as s_json_without_guaranteed_unique_keys from "./schemas/json_without_guaranteed_unique_keys.js"

export type API = {
    'serializers': {
        'json without unique keys': {
            'Document': p_s.Paragraph_Serializer<
                s_json_without_guaranteed_unique_keys.Document
            >
        }
        'json with unique keys': {
            'Document': p_s.Paragraph_Serializer<
                s_json_with_guaranteed_unique_keys.Document
            >
        }
    },
    'transformers': {


    },
    'refiners': {
        'json with parse info': {
            'list of characters': {
                'Value': p_r.Refiner_With_Parameter<
                    s_json_with_parse_info.Value,
                    s_deserialize_json.Error,
                    s_list_of_characters.List_Of_Characters,
                    s_deserialize_json.Parameters
                >
            }
        }

    },
}