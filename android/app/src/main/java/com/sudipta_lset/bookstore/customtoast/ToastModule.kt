package com.sudipta_lset.bookstore.customtoast

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ToastModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "ToastModule"
    }

    @ReactMethod
    fun show(message: String) {
        Toast.makeText(reactApplicationContext, message, Toast.LENGTH_SHORT).show()
    }
}
