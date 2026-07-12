
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/json_from_parse_tree_refiner.js"
import type * as s_out from "pareto-fountain-pen/interface/data/prose"

export type Error = p_.Transformer<
    s_in.Error,
    s_out.Phrase
>


