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
	 *     ADD PLANT FUNCTIONS      *
	 *                              *
	 ********************************/

    this.editPlant = function(plants){
        console.log(plants);
        $http({
            method: 'PUT',
            url: '/plants/' + plants._id,
            data: {
                nickname: this.nickname,
                species: this.species,
                water: this.water,
                sunlight: this.sunlight,
                image: this.image
            }
        }). then(function(){
            console.log(res.data);
            this.editedNickname = res.data.nickname;
            this.editedSpecies = res.data.species;
            this.editedWater = res.data.water;
            this.editedSunlight = res.data.sunlight;
            this.editedImage = res.data.image;
            controller.getPlants();
        });
    };

    this.deletePlant = function(plant) {
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
