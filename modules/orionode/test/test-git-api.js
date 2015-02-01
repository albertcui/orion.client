/*******************************************************************************
 * Copyright (c) 2013 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*eslint-env node, mocha*/
var assert = require("assert");
var mocha = require("mocha");
var request = require("supertest");

var path = require("path");
var testData = require("./support/test_data");

var WORKSPACE = path.join(__dirname, ".test_workspace");

var orion = require("../");

describe("Git API", function() {
	var app;
	beforeEach(function(done) {
		app = testData.createApp();
		testData.setUp(WORKSPACE, done);
	});

	describe("options", function() {
		it("demands workspaceDir", function(done) {
			try {
				assert.throws(function() {
					orion();
				});
			} catch (e) {
				done(e);
			}
			done();
		});
		it("accepts cache-max-age", function(done) {
			app.use(orion({
				workspaceDir: WORKSPACE,
				maxAge: 31337 * 1000 // ms
			}))
			.request()
			.get("/index.html")
			.expect("cache-control", /max-age=31337/, done); //seconds
		});
		// TODO test configParams once they are cleaned up/merged with options
	});

	describe("api", function() {
		//	Writing tests for orion
		//	for each thing the api should do add a
		//	=>it("description", callback)
		//	you should follow the pattern shown below closely, just changing the .get request, and the .expect
		it("should get the workspace", function(done) {
			app.use(orion({
				workspaceDir: WORKSPACE
			}))
			.request()
			.get("/gitapi/clone/workspace/")
			.expect(200, done);
		});
	});
});
