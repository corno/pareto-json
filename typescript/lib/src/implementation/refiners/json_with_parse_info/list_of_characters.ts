
import type * as interface_ from "../../../declarations/refiners/json_with_parse_info/list_of_characters.js"

//dependencies
import * as r_from_parse_tree from "./astn_parse_tree.js"
import * as r_astn_parse_tree_from_list_of_characters from "astn-core/implementation/manual/refiners/parse_tree/list_of_characters"

export const Value: interface_.Value = ($, abort, $p) => r_from_parse_tree.Value(
    r_astn_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['deserialize astn parse tree', $]),
        $p,
    ).content,
    ($) => abort(['jsonify', $])
)