function Start(){

	// Creating the scene
	var scene = new THREE.Scene()
	, WIDTH = window.innerWidth
	, HEIGHT = window.innerHeight;

	/* Creating the camera in perspective
		@param Field of View (FOV) - angle of the camera's lens opening 
		@param Aspect ratio with the size of the window
		@param near rendering limit (in pixels)
		@param far rendering limit (in pixels)
	*/
	var camera = new THREE.PerspectiveCamera(100, WIDTH / HEIGHT, 0.1, 1000);

	// Creating the rendering WebGL object
	var renderer = new THREE.WebGLRenderer();
	// Configuring renderer dimensions
	renderer.setSize(WIDTH, HEIGHT);

	// Inserting the renderer to the DOM
	document.getElementsByTagName('body')[0].appendChild(renderer.domElement);

	// Creating a light source that will allow MeshPhongMaterial to work
	var pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(100, 100, 250);
	scene.add(pointLight);

	/* Creating the 3D object of a sphere
		@param radius
		@param widthSegments
		@param heightSegments
	*/
	var geometry = new THREE.SphereGeometry(10, 32, 32);

	// Creating the material of the object, defining its exibition of wireframe
	var material = new THREE.MeshPhongMaterial();
	material.map = THREE.ImageUtils.loadTexture('img/earth.jpg');

	// Adding the created material to the created object
	var earth = new THREE.Mesh(geometry, material);

	// Adding the object to the scene
	scene.add(earth);

	// Defining the position of the camera
	camera.position.z = 20;

	//============================================================================

	// Loading the background scene
	var bgTexture = THREE.ImageUtils.loadTexture('img/starfield.jpg');
	var bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2,2,0), new THREE.MeshBasicMaterial({map: bgTexture}));
	bgMesh.material.depthTest = false;
	bgMesh.material.depthWrite = false;

	// Creating the background scene
	var bgScene = new THREE.Scene();
	var bgCamera = new THREE.Camera();
	bgScene.add(bgCamera);
	bgScene.add(bgMesh);

	//============================================================================

	// Defining the scene and the camera that will be used
	renderer.render(scene, camera);

	// Function to control the scene renderization
	function render(){

		// Executing recursevely
		requestAnimationFrame(render);

		// Altering axis values to execute some movement
		earth.rotation.y += 0.01;

		// Renderer should not automatically clear its output before rendering
		renderer.autoClear = false;
		renderer.clear();

		//Rendering the scene and the camera for the background
		renderer.render(bgScene, bgCamera);

		// Rendering the scene and the camera that will be used for the objects
		renderer.render(scene, camera);

	}

	// Executing the rendering function
	render();

}