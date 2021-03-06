// START OF JQUERY
$(() => {
    // ADD A PLANT START
    $(".close-add-plant-modal").on("click", function() {
      $('.add-plant-modal').removeClass('active');
    });
    $(".show-add-plant-modal").on("click", function() {
      $('.add-plant-modal').addClass('active');
    });
    // ADD A PLANT END
    // LOGIN MODAL START
    $(".close-login-modal").on("click", function() {
      $('.login-modal').removeClass('active');
    });
    $(".show-login-modal").on("click", function() {
      $('.login-modal').addClass('active');
    });
    // LOGIN MODAL END
    // CREATE ACCOUNT START
    $(".close-create-modal").on("click", function() {
      $('.create-modal').removeClass('active');
    });
    $(".show-create-modal").on("click", function() {
      $('.create-modal').addClass('active');
    });
    // CREATE ACCOUNT END
    // LOGOUT START
    $(".logout-btn").on("click", function() {
      $('.modal').removeClass('active');
    });
    // LOGOUT END

});
// END OF JQUERY


const app = angular.module('MyApp', []);

app.controller('AppController', ['$http', function($http){
    const controller = this;
	this.plantsToShow = null;
	/********************************
	 * AUTHORIZATION/NAV FUNCTIONS  *
	 *                              *
	 ********************************/
    this.logIn = function(){
        $http({
            method:'POST',
            url:'/sessions',
            data: {
                username:this.username,
                password:this.password
            }
        }).then(
            function(response){
            	console.log("Log In Response:",response.data);
                controller.username = null;
                controller.password = null;
                controller.goApp();
                controller.getPlants();
            },
            function(error){
                console.log(error);
            }
        );
    };
    this.logOut = function(){
        $http({
            method:'DELETE',
            url:'/sessions'
        }).then(
            function(response){
                console.log("logged out reponse:", response);
                controller.loggedInUsername = null;
            },
            function(error){
                console.log(error);
            }
        );
    };
    this.goApp = function(){
        $http({
            method:'GET',
            url:'/app'
        }).then(
            function(response){
				console.log("Username:", response.data.username);
				controller.loggedInUsername = response.data.username;
				console.log("loggedInUsername:", controller.loggedInUsername);

            },
            function(error){
                console.log(error);
            }
        );
    };
    // CREATEUSER
    this.createUser = function(){
        $http({
            method:'POST',
            url:'/sessions/newuser',
            data:{
                username:this.newUsername,
                password:this.newPassword
            }
        }).then(
            function(response){
                controller.newUsername = null;
                controller.newPassword = null;
                controller.goApp();
                console.log(response);
            },
            function(error){
                console.log(error);
            }
        );
    };
    /********************************
	 *     PLANT FUNCTIONS      *
	 *                              *
	 ********************************/

     this.editPlant = (plant) => {
 		console.log("Edit Route 1 (id of plant):", plant._id);
        console.log(this.editedNickname);
 		$http({
 			method:'PUT',
 			url:'/plants/'+ plant._id,
 			data:{
                test: "hello",
                nickname: this.editedNickname,
 			    species: this.editSpecies,
                water: this.editedWater,
                sunlight: this.editedSunlight,
                image: this.editedImage
 			}
 		}).then((res) => {
 			console.log("Edit Route 3 (res.data of edited plant):", res.data);
 			this.editedNickname = res.data.nickname;
 			this.editedSpecies = res.data.species;
 			this.editedWater = res.data.water;
 			this.editedSunlight = res.data.sunlight;
 			this.editedImage = res.data.image;
 			this.getPlants()
 		})
 	}

    this.deletePlant = function(plant) {
        console.log(plant);
        console.log("delete plant is running");
        $http({
            method: "DELETE",
            url: '/plants/' + plant._id
        }).then(
            function(res){
                controller.getPlants();
            },
            function(err){
            }
        );
    };
    // GET
    this.getPlants = () => {
        $http({
            method: 'GET',
            url: '/plants'
        }).then((res) => {
            this.plants = res.data;
            this.allPlants = () => {
                const plants = [];
                for (let i = 0; i < this.plants.length; i++) {
                    plants.push(this.plants[i]);
                }
                console.log(plants);
            };
        });
    };
    // CREATE PLANT
    this.addPlant = function() {
        $http({
            method:'POST',
            url: '/plants',
            data: {
                nickname: this.nickname,
                species: this.species,
                water: this.water,
                sunlight: this.sunlight,
                image: this.image
            }
        }).then(function(){
            this.nickname = null;
            this.species = null;
            this.water = null;
            this.sunlight = null;
            this.image = null;
            controller.getPlants();
        });
    };

}]);
