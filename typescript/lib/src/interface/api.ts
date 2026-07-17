import * as p_t from 'pareto-core/interface/transformer'
import * as p_r from 'pareto-core/interface/refiner'
import * as p_s from 'pareto-core/implementation/serializer'

//schemas
import * as s_deserialize_json from "../modules/deserialization/schemas/deserialization.js"
import * as s_list_of_characters from "../modules/deserialization/schemas/list_of_characters.js"
import * as s_json_with_guaranteed_unique_keys from "../modules/serialization/schemas/with_guaranteed_unique_keys.js"
import * as s_json_with_parse_info from "../modules/deserialization/schemas/deserialized_json.js"
import * as s_json_without_guaranteed_unique_keys from "../modules/serialization/schemas/without_guaranteed_unique_keys.js"
import type * as s_paragraph from "../modules/serialization/schemas/paragraph.js"

export type API = {
    'serializers': {
    },
    'transformers': {

        'json without unique keys': {
            'paragraph': {
                'Document': p_t.Transformer<
                    s_json_without_guaranteed_unique_keys.Document,
                    s_paragraph.Paragraph
                >
            }
        }
        'json with unique keys': {
            'paragraph': {
                'Document': p_t.Transformer<
                    s_json_with_guaranteed_unique_keys.Document,
                    s_paragraph.Paragraph
                >
            }
        }

    },
    'refiners': {
        'deserialized json': {
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