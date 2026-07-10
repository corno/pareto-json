import type * as p_ from 'pareto-core/interface/refiner'

import type * as d_out from "../../../interface/data/json_with_parse_info.js"
import type * as d_error from "../../../interface/data/json_from_list_of_characters_refiner.js"
import type * as d_in from "pareto-fountain-pen/interface/data/list_of_characters"
import type * as d_parameter from "astn-core/interface/data/deserialize_parse_tree"

export type Value = p_.Refiner_With_Parameter<
    d_out.Value,
    d_error.Error,
    d_in.List_of_Characters,
    d_parameter.Parameters
>

