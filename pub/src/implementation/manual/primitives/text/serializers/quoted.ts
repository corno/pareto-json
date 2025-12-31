import * as _pi from 'pareto-core-interface'
import * as _pt from 'pareto-core-transformer'

import { $$ as s_escaped_character } from "pareto-standard-operations/dist/implementation/manual/primitives/text/serializers/escaped_character"

export const $$ = ($: string): string => '"'
    + s_escaped_character(
        $,
        {
            'character code': 34, // "
            'escape character code': 92, // \
        }
    )
    + '"'