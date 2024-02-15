import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandlerPromiseVersion } from "../utils/asyncHandler.js";

const healthcheck = asyncHandlerPromiseVersion(async (req, res) => {
  //TODO: build a healthcheck response that simply returns the OK status as json with a message

  res
    .status(200)
    .send(new ApiResponse(200, "Vtube app is running successfully"));
});

export { healthcheck };
