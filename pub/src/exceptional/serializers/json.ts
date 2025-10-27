import * as pa from 'exupery-core-alg'


import * as d_in from "../../generated/interface/schemas/json/data_types/source"

import * as t_fountain_pen from "../../transformations/json/fountain_pen_block"

import * as s_fp from "pareto-fountain-pen/dist/exceptional/serialize/block"

export const Document = (
    $: d_in.Document,
    $p: {
        'indentation': string
        'newline': string
    }
): string => {
    return s_fp.Group(
        t_fountain_pen.Document(
            $,
        ),
        {
            'indentation': $p.indentation,
            'newline': $p['newline'],
        }
    )

}