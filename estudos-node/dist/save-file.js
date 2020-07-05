"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
fs.writeFile(process.argv[2], process.argv[3], (error) => {
    if (error)
        throw error;
    console.log(`File ${process.argv[2]} saved.`);
});
//# sourceMappingURL=save-file.js.map