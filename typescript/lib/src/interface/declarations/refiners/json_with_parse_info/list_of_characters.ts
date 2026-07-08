import type * as p_ from 'pareto-core/interface/refiner'

//data types
import type * as d_out from "../../../data/json_with_parse_info.js"
import type * as d_function from "../../../data/json_from_list_of_characters_refiner.js"
import type * as d_in from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"
import type * as d_parse_tree_from_list_of_characters from "astn-core/interface/generated/liana/schemas/deserialize_parse_tree/data"

//dependencies
import * as r_from_parse_tree from "./astn_parse_tree.js"
import * as r_astn_parse_tree_from_list_of_characters from "astn-core/implementation/manual/refiners/parse_tree/list_of_characters"


    export type Value = p_.Refiner_With_Parameter<
        d_out.Value,
        d_function.Error,
        d_in.List_of_Characters,
        d_parse_tree_from_list_of_characters.Parameters
    >

