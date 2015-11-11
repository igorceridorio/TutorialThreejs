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

	/* Creating the 3D object of a cube
		@param width
		@param height
		@param depth
	*/
	var geometry = new THREE.BoxGeometry(10, 10, 10);

	// Creating the material of the object, defining its exibition of wireframe
	var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});

	// Adding the created material to the created object
	var cube = new THREE.Mesh(geometry, material);

	// Adding the object to the scene
	scene.add(cube);

	// Defining the position of the camera
	camera.position.z = 20;

	// Defining the scene and the camera that will be used
	renderer.render(scene, camera);

	// Function to control the scene renderization
	function render(){

		// Defining the scene and the camera that will be used
		renderer.render(scene, camera);

		// Altering axis values to execute some movement
		cube.rotation.z += 0.01;
		cube.rotation.y += 0.01;
		cube.rotation.x += 0.01;

		// Executing recursively
		requestAnimationFrame(render);

	}

	// Executing the rendering function
	render();

}