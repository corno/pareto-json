import type * as p_ from 'pareto-core/implementation/refiner'

import type * as s_out from "../schema.js"
import type * as s_error from "../../deserialization/schema.js"
import type * as s_parameters from "astn-core/modules/deserialization/schemas/parse_tree_deserialization/schema"
import type * as s_in from "astn-core/modules/deserialization/schemas/list_of_characters/schema"

namespace declarations {
    export type Value = p_.Refiner_With_Parameter<
        s_out.Value,
        s_error.Error,
        s_in.List_Of_Characters,
        s_parameters.Parameters
    >
}

//dependencies
import * as r_from_parse_tree from "./astn_parse_tree.js"
import * as r_parse_tree_from_list_of_characters from "astn-core/modules/deserialization/schemas/parse_tree/refiners/list_of_characters"

export const Value: declarations.Value = ($, abort, $p) => r_from_parse_tree.Value(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['deserialize astn parse tree', $]),
        $p,
    ).content,
    ($) => abort(['jsonify', $])
)