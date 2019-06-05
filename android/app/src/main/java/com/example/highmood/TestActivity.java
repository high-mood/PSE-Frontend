package com.example.highmood;

import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.util.Log;
import android.view.ContextThemeWrapper;
import android.view.View;
import android.support.v4.view.GravityCompat;
import android.support.v7.app.ActionBarDrawerToggle;
import android.view.MenuItem;
import android.support.design.widget.NavigationView;
import android.support.v4.widget.DrawerLayout;

import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;
import com.github.mikephil.charting.utils.ColorTemplate;

import java.util.ArrayList;
import java.util.List;

public class TestActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        NavigationView navigationView = findViewById(R.id.nav_view);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();
        navigationView.setNavigationItemSelectedListener(this);

        LineChart chart = (LineChart) findViewById(R.id.chart);
        chart.setDragEnabled(true);

        ArrayList<DataObject> list = new ArrayList<DataObject>();

        for (int i = 0; i < 1000; i++) {
            list.add(new DataObject());
        }

        List<Entry> entries = new ArrayList<Entry>();
        for (DataObject data : list) {
            // turn your data into Entry objects
            entries.add(new Entry(data.x, data.y));
        }

        LineDataSet dataSet = new LineDataSet(entries, "Label");
//        dataSet.setAxisDependency(YAxis.AxisDependency.LEFT);
        dataSet.setColor(Color.rgb(0, 255, 0));
        dataSet.setCircleColor(Color.rgb(0, 0, 10));

//        LineData lineData = new LineData(dataSet);
//        chart.setData(lineData);
//----------
        list = new ArrayList<DataObject>();

        DataObject.reset();


        for (int i = 0; i < 1000; i++) {
            list.add(new DataObject());
        }


        List<Entry> entries2 = new ArrayList<Entry>();
        for (DataObject data : list) {
            // turn your data into Entry objects
            entries2.add(new Entry(data.x, data.y));
        }

        LineDataSet dataSet2 = new LineDataSet(entries2, "Second label");
//        dataSet2.setAxisDependency(YAxis.AxisDependency.LEFT);
        dataSet2.setColor(Color.rgb(255, 0, 0));
        dataSet2.setCircleColor(Color.rgb(0, 90, 0));


//        LineData lineData2 = new LineData(dataSet2);

        List<ILineDataSet> dataSets = new ArrayList<ILineDataSet>();
        dataSets.add(dataSet);
        dataSets.add(dataSet2);

        LineData lineData = new LineData(dataSets);


        chart.setData(lineData);
        chart.setVisibleXRangeMaximum(100.0f);

        chart.invalidate();
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.test, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_home) {
            // Handle the camera action
        } else if (id == R.id.nav_gallery) {

        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_tools) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }

        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
