<?php

namespace App\Traits;

use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\File;

trait StoreImage {

    public $resize = true;

    public $resize_width = 800;

    public $resize_height = 800;
/**
     * Store uploaded Testimonial image
     *
     * @param $Testimonial
     * @param $request
     * @return bool
     */
    public function storeImage($image, $thumbnailSize = null)
    {

        if ($image) {
            $name = null;
            if($image){
                $name = time(). "_" . $image->getClientOriginalName();
                $storagePath = public_path('site/images/' . $this->storagePath);

                $this->makeFolder($storagePath);

                if(!empty($thumbnailSize)) {
                    $this->saveThumbnails($image, $thumbnailSize, $name);
                }
                $image->move($storagePath, $name);
                $img = Image::make($storagePath . "/" .$name);
                if ($this->resize) {
                    $img->resize(800,800);
                }
                $img->insert(public_path('site/images/watermark/rajus_watermark.png'), 'bottom-right');
                $img->save($storagePath . "/" .$name);
            }
            $this->unlinkImage($this->getOriginal($this->fileParamName));
            $this->{$this->imageFieldName} = $name;

            return true;
        } elseif (request()->input('remove_image') || request()->input('remove_image_' . $this->imageFieldName)) {
            $this->unlinkImage($this->getOriginal($this->fileParamName));
            $this->{$this->imageFieldName} = null;
            return true;
        }

        return false;
    }

    public function unlinkImage($image)
    {
        if(empty($image)) {
            return null;
        }
        $existing_file = public_path('site/images/' . $this->storagePath . "/") . $image;

        $existing_fileThumbnail = public_path('site/images/' . $this->storagePath . '/thumbnails/' ) . $image;


        info("Thumbnails : " . $existing_fileThumbnail);

        if (file_exists($existing_file)) {
            @unlink($existing_file);
        } else {
            info(" File is not Exists " . $existing_file);
        }

        if (file_exists($existing_fileThumbnail)) {
            @unlink($existing_fileThumbnail);
        } else {
            info(" File Thumbnails is not Exists " . $existing_fileThumbnail);
        }


        return true;
    }


    public function saveThumbnails($image, $thumbnailSize, $name)
    {
        //$image = public_path('web/images/' . $this->storagePath . '/') . $name ;

        $thumbnailpath = public_path('site/images/' . $this->storagePath . '/thumbnails') ;

        $this->makeFolder($thumbnailpath);

        $img = Image::make($image->getRealPath())->resize($thumbnailSize['width'], $thumbnailSize['height'], function($constraint) {
            //$constraint->aspectRatio();
        });
        $img->insert(public_path('site/images/watermark/rajus_watermark.png'), 'bottom-right');


        $img->save($thumbnailpath . '/' . $name);
    }

    public function makeFolder($filePath)
    {
        if(!File::exists($filePath)) {
            File::makeDirectory($filePath);
        }
    }
}
