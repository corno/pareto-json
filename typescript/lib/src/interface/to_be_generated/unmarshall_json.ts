import * as pt from 'pareto-core/dist/assign'
import * as p_di from 'pareto-core/dist/data/interface'
import p_change_context from 'pareto-core/dist/specials/change_context'

//data types
import * as d_unmarshalled_from_json from "./unmarshalled_from_json"
import * as d_json_from_list_of_characters from "./json_from_list_of_characters"

export type Error =
    | ['deserialize', d_json_from_list_of_characters.Error]
    | ['unmarshall', d_unmarshalled_from_json.Error]