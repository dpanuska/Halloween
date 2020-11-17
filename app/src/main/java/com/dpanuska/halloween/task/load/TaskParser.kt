package com.dpanuska.halloween.task.load

import com.dpanuska.halloween.task.BaseTask
import org.json.JSONObject
import java.lang.Exception

/**
 * Base class for a JSON task parser.  Implementation should implement all members.
 */
open class TaskParser {
    open fun createFromJSON(taskJSON: JSONObject, suspend: Boolean, taskName: String?): BaseTask? {
        throw Exception("Not implemented, must override createFromJSON")
    }

    open val supportedTypes: ArrayList<String> by lazy {
        throw Exception("Parser must define supportedTypes")
    }
}