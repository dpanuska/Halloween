package com.dpanuska.halloween.modules.pose;

import android.content.Context;

import org.unimodules.core.BasePackage;
import org.unimodules.core.ExportedModule;
import org.unimodules.core.interfaces.InternalModule;

import java.util.Collections;
import java.util.List;

public class PoseDetectorPackage extends BasePackage {
    @Override
    public List<InternalModule> createInternalModules(Context context) {
        return Collections.singletonList((InternalModule) new PoseDetectorProvider());
    }

    @Override
    public List<ExportedModule> createExportedModules(Context reactContext) {
        return Collections.singletonList((ExportedModule) new PoseDetectorModule(reactContext));
    }
}