
import * as d_in from "../../../../../interface/generated/liana/schemas/json/data"
import * as d_out from "pareto-fountain-pen/dist/interface/to_be_generated/text"

import * as t_fountain_pen from "./fountain_pen_block"

import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/schemas/block/transformers/text"

export const Document = (
    $: d_in.Document,
    $p: {
        'indentation': string
        'newline': string
    }
): d_out.Text => t_fp_to_text.Group(
    t_fountain_pen.Document(
        $,
    ),
    {
        'indentation': $p.indentation,
        'newline': $p['newline'],
    }
)