import type * as p_ from 'pareto-core/interface/refiner'

import type * as d_out from "../../../interface/data/json_with_parse_info.js"
import type * as d_error from "../../../interface/data/json_from_list_of_characters_refiner.js"
import type * as d_in from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"
import type * as d_parameter from "astn-core/interface/generated/liana/schemas/deserialize_parse_tree/data"

export type Value = p_.Refiner_With_Parameter<
    d_out.Value,
    d_error.Error,
    d_in.List_of_Characters,
    d_parameter.Parameters
>

