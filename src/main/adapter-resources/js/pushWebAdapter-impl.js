function encode(user, password) {
	return {
		result: com.gbm.utils.Encode.code(user, password)
	};
}

function getApps(runtime) {
	var user = MFP.Server.getPropertyValue("operatorUser");
	var password = MFP.Server.getPropertyValue("operatorPassword");
	var input = {
		method: 'get',
		headers: {
			'Authorization': 'Basic ' + encode(user, password).result
		},
		returnedContentType: 'json',
		path: '/mfpadmin/management-apis/2.0/runtimes/' + runtime + '/applications?orderBy=displayName'
	};
	var response = MFP.Server.invokeHttp(input);
	/*var userLogedin = MFP.Server.getAuthenticatedUser();
	response.displayName = userLogedin.displayName;*/
	return response;
}

function getApp(runtime, packageId) {
	var user = MFP.Server.getPropertyValue("operatorUser");
	var password = MFP.Server.getPropertyValue("operatorPassword");
	var input = {
		method: 'get',
		headers: {
			'Authorization': 'Basic ' + encode(user, password).result
		},
		returnedContentType: 'json',
		path: '/mfpadmin/management-apis/2.0/runtimes/' + runtime + '/applications/' + packageId
	};
	return MFP.Server.invokeHttp(input);
}

function getDevices(runtime, packageId) {
	var user = MFP.Server.getPropertyValue("operatorUser");
	var password = MFP.Server.getPropertyValue("operatorPassword");
	var input = {
		method: 'get',
		headers: {
			'Authorization': 'Basic ' + encode(user, password).result
		},
		returnedContentType: 'json',
		path: '/mfpadmin/management-apis/2.0/runtimes/' + runtime + '/notifications/applications/' + packageId + '/devices'
	};
	return MFP.Server.invokeHttp(input);
}

function getPushDeviceRegistration(runtime, packageId, offset, size) {
	var user = MFP.Server.getPropertyValue("operatorUser");
	var password = MFP.Server.getPropertyValue("operatorPassword");
	var input = {
		method: 'get',
		headers: {
			'Authorization': 'Basic ' + encode(user, password).result
		},
		returnedContentType: 'json',
		path: 'mfpadmin/management-apis/2.0/runtimes/' + runtime + '/notifications/applications/' + packageId + '/devices?expand=true&offset=' + offset + '&size=' + size
	};
	return MFP.Server.invokeHttp(input);
}

function getToken(user, password, packageId) {
	/*var scopePush = "messages.write push.application.com.gbm.chat";
	var scopeApps = "push.application.* apps.read";
	var user = MFP.Server.getPropertyValue("user");
	var password = MFP.Server.getPropertyValue("password");*/
	//MFP.Logger.info(code().result);
	var input = {
		method: 'post',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + encode(user, password).result
		},
		parameters: {
			"grant_type": "client_credentials",
			"scope": "tags.read messages.write push.application." + packageId
		},
		returnedContentType: 'json',
		path: '/mfp/api/az/v1/token'
	};
	return MFP.Server.invokeHttp(input);
}

function sendPush(packageId, token, platforms, message) {
	var platf = [];
	if (platforms == "G") {
		platf = ["G"];
	} else if (platforms == "A") {
		platf = ["A"];
	} else if (platforms == "ALL") {
		platf = ["G", "A"];
	}
	//var token = MFP.Server.getPropertyValue("token");
	var input = {
		method: 'post',
		headers: {
			'Accept-Language': 'en-US',
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
		body: {
			contentType: 'application/json',
			content: JSON.stringify({
				"message": {
					"alert": message
				},
				"notificationType": 1,
				"target": {
					"platforms": platf
				}
			})
		},
		returnedContentType: 'json',
		path: '/imfpush/v1/apps/' + packageId + '/messages'
	};
	//return MFP.Server.invokeHttp(input);
	var response = MFP.Server.invokeHttp(input);
	var userLogedin = MFP.Server.getAuthenticatedUser();
	response.displayName = userLogedin.displayName;
	return response;
}