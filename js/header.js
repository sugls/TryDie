var RENDERER = {
	TEXT : 'www.trydie.com',
	FONT_SIZE : 160,
	ACCELARATION: 15,
	RADIUS : 1.5,
	COUNT : 40,
	DELAY : 1,
	BLOCKS : 50,
	
	init : function(){
		this.setParameters();
		this.reconstructMethods();
		this.bindEvent();
		this.createParticles();
		this.render();
	},
	setParameters : function(){
		this.$window = $(window);
		this.$container = $('#jsi-keyvisual-container');
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.distance = Math.sqrt(Math.pow(this.width / 2, 2) + Math.pow(this.height / 2, 2));
		this.$canvas = $('<canvas />').attr({width : this.width, height : this.height}).appendTo(this.$container);
		this.context = this.$canvas.get(0).getContext('2d');
		this.cx = this.width / 2;
		this.cy = this.height / 2;
		this.particles = [];
		this.gravity = false;
		this.count = 0;
		this.accelaration = 1;
	},
	reconstructMethods : function(){
		this.render = this.render.bind(this);
		this.setGravity = this.setGravity.bind(this);
		this.releaseGravity = this.releaseGravity.bind(this);
	},
	bindEvent : function(){
		this.$container.on('mousemove', this.setGravity);
		this.$container.on('mouseleave', this.releaseGravity);
	},
	setGravity : function(event){
		var offset = this.$container.offset();
		this.cx = event.clientX - offset.left + this.$window.scrollLeft();
		this.cy = event.clientY - offset.top + this.$window.scrollTop();
		
		if(this.gravity){
			return;
		}
		var isAsc = this.cx <= this.width / 2;
		
		for(var i = 0, length = this.particles.length; i < length; i++){
			this.particles[i].setStartPosition(isAsc);
		}
		this.gravity = true;
	},
	releaseGravity : function(){
		this.gravity = false;
		this.count = 0;
		this.accelaration = this.ACCELARATION;
	},
	createParticles : function(){
		var gradient = this.context.createLinearGradient(0, 0, this.width, 0);
		gradient.addColorStop(0, 'rgb(1, 0, 0)');
		gradient.addColorStop(1, 'rgb(' + this.BLOCKS + ', 0, 0)');
		
		this.context.font = '900 ' + this.FONT_SIZE + 'px "HG正楷書体-PRO"';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		this.context.fillStyle = gradient;
		this.context.fillText(this.TEXT, this.width / 2, this.height / 2);
		
		var imageData = this.context.getImageData(0, 0, this.width, this.height).data,
			particles = this.particles;
			
		for(var i = 0, width = this.width, diameter = this.RADIUS * 2; i < width; i += diameter){
			for(var j = 0, height = this.height; j < height; j += diameter){
				var index = imageData[(i + j * width) * 4];
				
				if(index == 0){
					continue;
				}
				particles.push(new PARTICLE(width, height, i, j, index, this));
			}
		}
	},
	render : function(){
		requestAnimationFrame(this.render);
		
		var gradient = this.context.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.distance),
			opacity = this.gravity ? 1 : (0.2 + 0.8 * Math.pow((this.ACCELARATION - this.accelaration) / (this.ACCELARATION - 1), 2));
			
		gradient.addColorStop(0, 'hsla(180, 100%, 60%, ' + opacity + ')');
		gradient.addColorStop(0.2, 'hsla(180, 100%, 50%, ' + opacity + ')');
		gradient.addColorStop(1, 'hsla(180, 100%, 20%, ' + opacity + ')');
		
		this.context.fillStyle = gradient;
		this.context.fillRect(0, 0, this.width, this.height);
		
		this.particles.sort(function(particle1, particle2){
			return particle1.scale - particle2.scale;
		});
		for(var i = 0, length = this.particles.length; i < length; i++){
			this.particles[i].render(this.count, this.accelaration);
		}
		if(this.gravity){
			this.count = Math.min(this.count + 1, this.COUNT + this.DELAY * (this.BLOCKS - 1));
		}else if(this.accelaration > 1){
			this.accelaration -= 0.05;
			
			if(this.accelaration < 1){
				this.accelaration = 1;
			}
		}
	}
};
var PARTICLE = function(width, height, x0, y0, index, renderer){
	this.width = width;
	this.height = height;
	this.x0 = x0;
	this.y0 = y0;
	this.index = index;
	this.renderer = renderer;
	this.init();
};
PARTICLE.prototype = {
	COLOR : 'hsl(35, %saturation%, %luminance%)',
	MAX_SCALE : 4,
	THRESHOLD : 1.5,
	
	init : function(){
		this.x = this.getRandomValue(-this.width * (this.THRESHOLD - 1), this.width * this.THRESHOLD);
		this.y = this.getRandomValue(-this.height * (this.THRESHOLD - 1), this.height * this.THRESHOLD);
		this.angle = this.getRandomValue(0, Math.PI * 2);
		this.scale = this.getRandomValue(1, this.MAX_SCALE);
		
		var velocity = Math.pow(this.scale / this.MAX_SCALE, 2) * 0.5;
		this.vx = velocity * Math.cos(this.angle);
		this.vy = velocity * Math.sin(this.angle);
		this.opacity = 0;
		this.radius = this.renderer.RADIUS * this.scale;
		
		var color = this.COLOR.replace('%saturation', Math.round(100 * Math.pow((this.scale - 1) / (this.MAX_SCALE - 1), 2)));
		this.gradient = this.renderer.context.createRadialGradient(0, 0, 0, 0, 0, this.renderer.RADIUS);
		this.gradient.addColorStop(0, color.replace('%luminance', 80));
		this.gradient.addColorStop(1, color.replace('%luminance', 50));
		color = this.COLOR.replace('%saturation', 100);
		this.gradient0 = this.renderer.context.createRadialGradient(0, 0, 0, 0, 0, this.renderer.RADIUS);
		this.gradient0.addColorStop(0, color.replace('%luminance', 80));
		this.gradient0.addColorStop(1, color.replace('%luminance', 50));
	},
	getRandomValue : function(min, max){
		return min + (max - min) * Math.random();
	},
	setStartPosition : function(isAsc){
		this.start = this.renderer.DELAY * (isAsc ? (this.index - 1) : (this.renderer.BLOCKS - this.index));
	},
	render : function(count, accelaration){
		var context = this.renderer.context;
		
		if(this.x >= -this.radius && this.x <= this.width + this.radius && this.y >= -this.radius && this.y <= this.height + this.radius){
			context.save();
			
			if(count >= this.renderer.COUNT + this.start){
				context.fillStyle = this.gradient0;
				this.opacity = 1;
			}else{
				context.fillStyle = this.gradient;
			}
			context.globalAlpha = this.opacity;
			context.translate(this.x, this.y);
			
			var scale = this.scale;
			
			if(count >= this.start){
				scale = Math.max(1 + (this.scale - 1) * (1 - (count - this.start) / this.renderer.COUNT), 1);
			}else if(accelaration > 1){
				scale = 1 + (this.scale - 1) * (this.renderer.ACCELARATION - accelaration) / (this.renderer.ACCELARATION - 1);
			}
			context.scale(scale, scale);
			
			context.beginPath();
			context.arc(0, 0, this.renderer.RADIUS, 0, Math.PI * 2, false);
			context.fill();
			context.restore();
		}
		if(count >= this.start){
			if(count == this.start){
				this.sx = this.x;
				this.sy = this.y;
				this.dx = this.x0 - this.sx;
				this.dy = this.y0 - this.sy;
			}
			var rate = Math.min((count - this.start) / this.renderer.COUNT, 1);
			this.x = this.sx + this.dx * rate;
			this.y = this.sy + this.dy * rate;
		}else{
			this.x += this.vx * accelaration;
			this.y += this.vy * accelaration;
		}
		if(this.opacity < 1){
			this.opacity += 0.01;
			
			if(this.opacity > 1){
				this.opacity = 1;
			}
		}
		if(this.x < -this.width * (this.THRESHOLD - 1) || this.x > this.width * this.THRESHOLD || this.y < -this.height * (this.THRESHOLD - 1) || this.y > this.height * this.THRESHOLD){
			this.init();
		}
	}
};
// $(function(){
// 	RENDERER.init();
// });
