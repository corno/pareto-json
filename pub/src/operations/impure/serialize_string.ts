import * as _et from 'exupery-core-types'
import * as _ea from 'exupery-core-alg'

import { $$ as op_escape_character } from "pareto-standard-operations/dist/impure/text/escape_character"

export const $$ = ($: string): string => '"'
    + op_escape_character(
        $,
        {
            'character code': 34, // "
            'escape character code': 92, // \
        }
    )
    + '"'