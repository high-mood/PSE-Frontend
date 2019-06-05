package com.example.highmood;
import java.util.Random;

public class DataObject {
    static Random generator = new Random();
    static int num_objects = 0;
    public int x;
    public float y;


    public DataObject() {
        x = num_objects;
        num_objects++;
        y = generator.nextFloat();
    }



    @Override
    public String toString() {
        return String.format("(%d, %f)", x, y);
    }

    static void reset() {
        num_objects = 0;
    }
}
