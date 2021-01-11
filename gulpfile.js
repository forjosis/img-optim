// качество
let qualityImg = 80;
// пропорции
let widthImg = 1090;
let heightImg = 450;
// crop
let crop = true;

let { src, dest, watch, series, parallel } = require('gulp');
let imagemin = require('gulp-imagemin');
let imageResize = require('gulp-image-resize');
let del = require('del');



// Define paths
let source_folder  = 'src';
let project_folder = 'dist';

let path = {
	src:{
		img: source_folder + '/**/*',
	},
	build:{
		img: project_folder + '/*',
	},
}


// delete
function delImg(){	
	return del(path.build.img, { force: true })
}

// img Resize
function imgResize(){
	return src(path.src.img)
    .pipe(imageResize({
		width : widthImg,
		height : heightImg,
		crop : crop,
		upscale : false
	  }))
	.pipe(imagemin([
		imagemin.mozjpeg({quality: qualityImg, progressive: true}),
	]))
	.pipe(dest(project_folder))
}

// img
function images(){
	return src(path.src.img)
	.pipe(imagemin([
		imagemin.mozjpeg({quality: qualityImg, progressive: true}),
	]))
	.pipe(dest(project_folder))
}

exports.delImg = delImg;
exports.imgResize = imgResize;
exports.images = images;
exports.img = series(delImg, images);
exports.imgR = series(delImg, imgResize);