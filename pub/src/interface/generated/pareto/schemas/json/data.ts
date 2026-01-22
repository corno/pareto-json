
import * as _pi from "pareto-core/dist/interface"

import * as i__location from "../../core/location"

export namespace Value_ {
    
    export namespace array {
        
        export type L = Value_
        
    }
    
    export type array = _pi.List<array.L>
    
    export namespace object_ {
        
        export namespace key_value_array {
            
            export namespace L {
                
                export type key = string
                
                export type value = Value_
                
            }
            
            export type L = {
                readonly 'key': L.key
                readonly 'value': L.value
            }
            
        }
        
        export type key_value_array = _pi.List<key_value_array.L>
        
        export namespace dictionary {
            
            export type D = Value_
            
        }
        
        export type dictionary = _pi.Dictionary<dictionary.D>
        
    }
    
    export type object_ = 
        | readonly ['key value array', object_.key_value_array]
        | readonly ['dictionary', object_.dictionary]
    
    export namespace number_ {
        
        export type integer = number
        
        export type float = number
        
    }
    
    export type number_ = 
        | readonly ['integer', number_.integer]
        | readonly ['float', number_.float]
    
    export type string_ = string
    
    export type boolean_ = boolean
    
    export type null_ = null
    
}

export type Value_ = 
    | readonly ['array', Value_.array]
    | readonly ['object', Value_.object_]
    | readonly ['number', Value_.number_]
    | readonly ['string', Value_.string_]
    | readonly ['boolean', Value_.boolean_]
    | readonly ['null', Value_.null_]

export type Document_ = Value_

export { 
    Value_ as Value, 
    Document_ as Document, 
}
