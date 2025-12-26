import * as _et from 'exupery-core-types'
import * as _ea from 'exupery-core-alg'

import { $$ as s_escaped_character } from "pareto-standard-operations/dist/implementation/serializers/primitives/text/escaped_character"

export const $$ = ($: string): string => '"'
    + s_escaped_character(
        $,
        {
            'character code': 34, // "
            'escape character code': 92, // \
        }
    )
    + '"'