import type * as p_ from 'pareto-core/interface/refiner'

import type * as s_out from "../../../interface/schemas/json_with_parse_info.js"
import type * as s_error from "../../../interface/schemas/json_from_list_of_characters_refiner.js"
import type * as s_in from "pareto-fountain-pen/interface/data/list_of_characters"
import type * as s_parameter from "astn-core/interface/data/deserialize_parse_tree"

export type Value = p_.Refiner_With_Parameter<
    s_out.Value,
    s_error.Error,
    s_in.List_of_Characters,
    s_parameter.Parameters
>

