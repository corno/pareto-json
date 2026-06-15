import * as p_i from 'pareto-core/dist/interface/refiner'

//data types
import * as d_out from "../../../../interface/data/json_with_parse_info"
import * as d_function from "../../../../interface/data/json_from_list_of_characters"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"
import * as d_parse_tree_from_list_of_characters from "astn-core/dist/interface/generated/liana/schemas/deserialize_parse_tree/data"

//dependencies
import * as r_from_parse_tree from "./astn_parse_tree"
import * as r_astn_parse_tree_from_list_of_characters from "astn-core/dist/implementation/manual/refiners/parse_tree/list_of_characters"

export type Value = p_i.Refiner_With_Parameter<
    d_out.Value,
    d_function.Error,
    d_in.List_of_Characters,
    d_parse_tree_from_list_of_characters.Parameters
>

export const Value: Value = ($, abort, $p) => r_from_parse_tree.Value(
    r_astn_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['deserialize astn parse tree', $]),
        $p,
    ).content,
    ($) => abort(['jsonify', $])
)