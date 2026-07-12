import type * as p_ from 'pareto-core/interface/refiner'

import type * as s_out from "../../../interface/schemas/json_with_parse_info.js"
import type * as s_error from "../../../interface/schemas/json_from_list_of_characters_refiner.js"
import type * as s_in from "../../../interface/schemas/list_of_characters.js"
import type * as s_parameters from "../../../interface/schemas/deserialize_parse_tree.js"

export type Value = p_.Refiner_With_Parameter<
    s_out.Value,
    s_error.Error,
    s_in.List_of_Characters,
    s_parameters.Parameters
>

