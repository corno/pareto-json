
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/json_from_list_of_characters_refiner.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_json_from_parse_tree_refiner_to_prose from "../json_from_parse_tree_refiner/prose.js"
import * as t_deserialize_parse_tree_to_prose from "astn-core/implementation/manual/transformers/deserialize_parse_tree/prose"



    export type Error = p_.Transformer<
        d_in.Error,
        d_out.Phrase
    >


