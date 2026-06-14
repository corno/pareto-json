import * as pt from 'pareto-core/dist/assign'
import * as pi from 'pareto-core/dist/interface'
import p_change_context from 'pareto-core/dist/_p_change_context'

//data types
import * as d_unmarshalled_from_json from "./unmarshalled_from_json"
import * as d_json_from_list_of_characters from "./json_from_list_of_characters"

export type Error =
    | ['deserialize', d_json_from_list_of_characters.Error]
    | ['unmarshall', d_unmarshalled_from_json.Error]