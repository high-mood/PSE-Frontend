package com.example.highmood;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.example.highmood.R;

public class LandingActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_landing);

        final Button spotify_button = findViewById(R.id.spotify_login);
        spotify_button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent i = new Intent(LandingActivity.this, TestActivity.class);
                startActivity(i);
            }
        });

        final Button mood_button = findViewById(R.id.mood_login);
        mood_button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
//                Intent
            }
        });
    }



}
