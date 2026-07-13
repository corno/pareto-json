import type * as p_ from 'pareto-core/implementation/refiner'

import type * as s_out from "../../../interface/schemas/json_with_parse_info.js"
import type * as s_error from "../../../interface/schemas/deserialize_json.js"
import type * as s_parameters from "../../../interface/schemas/astn_deserialize_parse_tree.js"
import type * as s_in from "../../../interface/schemas/list_of_characters.js"

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
import * as api_astn_core from "astn-core/api"

export const Value: declarations.Value = ($, abort, $p) => r_from_parse_tree.Value(
    api_astn_core.api.refiners['parse tree']['list of characters'].Document(
        $,
        ($) => abort(['deserialize astn parse tree', $]),
        $p,
    ).content,
    ($) => abort(['jsonify', $])
)