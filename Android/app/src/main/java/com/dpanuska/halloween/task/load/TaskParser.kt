package com.dpanuska.halloween.task.load

import com.dpanuska.halloween.task.BaseTask
import org.json.JSONObject
import java.lang.Exception

/**
 * Base class for a JSON task parser.  Implementation should implement all members.
 */
open class TaskParser {
    /**
     * Identify which types of tasks are supported by this parser
     */
    open val supportedTypes: ArrayList<String> by lazy {
        throw Exception("Parser must define supportedTypes")
    }

    /**
     * Create a supported task type from JSON. Is passed common attributes for code reuse
     */
    open fun createFromJSON(taskJSON: JSONObject, suspend: Boolean, taskName: String?): BaseTask? {
        throw Exception("Not implemented, must override createFromJSON")
    }
}