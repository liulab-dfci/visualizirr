function the_mean(a) {
  let sum = a.reduce((previous, current) => current += previous);
  let avg = sum / a.length;
  return avg;
}

var cond1_data = [];
var cond2_data = [];

function data_load(cond1_file, cond2_file, cond1_name, cond2_name) {

  hideOrShow(false, 'plotDiv3')

  d3.text(cond1_file).then(function(data) {
    var cdr3_list = d3.csvParseRows(data);
    for (let i = 0; i < cdr3_list.length; i++) {

      cond1_data = [];

      d3.text("data/out/TRUST_" + cdr3_list[i][0] + "_cdr3.out").then(function(data2) {

        var entries = d3.tsvParseRows(data2);
        for (let j = 0; j < entries.length; j++) {

          var wholeline = entries[j].toString();
          var count = Math.round(entries[j][9])

          const chains = ['IGL', 'IGK', 'IGH', 'TRB', 'TRA', 'TRG', 'TRD'];
          for (var i = 0; i < chains.length; i++) {
            if (wholeline.includes(chains[i])) {
              cond1_data[chains[i]] = cond1_data[chains[i]] || [];
              length = entries[j][7].length
              if (length > 99) { length = 100; }
              if (typeof cond1_data[chains[i]][length] === 'undefined') {
                cond1_data[chains[i]][length] = count;
              } else {
                cond1_data[chains[i]][length] = cond1_data[chains[i]][length] + count;
              }
              break;
            }
          }

          if (j == (entries.length - 1)) {
            var update = {
              x: [Object.keys(cond1_data[currentChain])],
              y: [Object.values(cond1_data[currentChain])],
              name: [cond1_name],
              visible: true
            }
            Plotly.restyle('plotDiv3', update, 0);
          }

        }

      });
    }
  });

  d3.text(cond2_file).then(function(data) {
    var cdr3_list = d3.csvParseRows(data);
    for (let i = 0; i < cdr3_list.length; i++) {

      cond2_data = [];

      d3.text("data/out/TRUST_" + cdr3_list[i][0] + "_cdr3.out").then(function(data2) {

        var entries = d3.tsvParseRows(data2);

        for (let j = 0; j < entries.length; j++) {

          var wholeline = entries[j].toString();
          var count = Math.round(entries[j][9])

          const chains = ['IGL', 'IGK', 'IGH', 'TRB', 'TRA', 'TRG', 'TRD'];
          for (var i = 0; i < chains.length; i++) {
            if (wholeline.includes(chains[i])) {
              cond2_data[chains[i]] = cond2_data[chains[i]] || [];
              length = entries[j][7].length
              if (length > 99) { length = 100; }
              if (typeof cond2_data[chains[i]][length] === 'undefined') {
                cond2_data[chains[i]][length] = count;
              } else {
                cond2_data[chains[i]][length] = cond2_data[chains[i]][length] + count;
              }
              break;
            }
          }

          if (j == (entries.length - 1)) {
            var update = {
              x: [Object.keys(cond2_data[currentChain])],
              y: [Object.values(cond2_data[currentChain])],
              name: [cond2_name],
              visible: true
            }
            Plotly.restyle('plotDiv3', update, 1);
          }

        }

      });

    }
  });
}

$(document).ready(function () {

  var x = ['Subset 1', 'Subset 1', 'Subset 1', 'Subset 1', 'Subset 1', 'Subset 1',
    'Subset 2', 'Subset 2', 'Subset 2', 'Subset 2', 'Subset 2', 'Subset 2']

  var trace1 = {
    y: [0.2, 0.2, 0.6, 1.0, 0.5, 0.4, 0.2, 0.7, 0.9, 0.1, 0.5, 0.3],
    x: x,
    name: 'Sample 1',
    marker: { color: '#3D9970' },
    type: 'box',
    boxpoints: 'all'
  };

  var trace2 = {
    y: [0.6, 0.7, 0.3, 0.6, 0.0, 0.5, 0.7, 0.9, 0.5, 0.8, 0.7, 0.2],
    x: x,
    name: 'Sample 2',
    marker: { color: '#FF4136' },
    type: 'box',
    boxpoints: 'all'
  };

  var trace3 = {
    y: [0.1, 0.3, 0.1, 0.9, 0.6, 0.6, 0.9, 1.0, 0.3, 0.6, 0.8, 0.5],
    x: x,
    name: 'Sample 3',
    marker: { color: '#FF851B' },
    type: 'box',
    boxpoints: 'all'
  };

  var data = [trace1, trace2, trace3];

  var layout = {
    title: 'Title',
    yaxis: {
      title: 'Y Axis',
      zeroline: false
    },
    xaxis: {
      title: 'X Axis'
    },
    boxmode: 'group',
    updatemenus: [{
      direction: 'left',
      showactive: false,
      type: 'buttons',
      x: 0,
      xanchor: 'left',
      y: 1.2,
      yanchor: 'top'
    }]
  };

  Plotly.newPlot('plotDiv', data, layout);




  trace1 = {
    type: 'box',
    y: [0.17295897809749694, 0.17986519802824263, 0.06225122313009468, 0.504901133476855, 0.4698672919196547, 0.0031802217959704393, 0.7921427953933953, 1.0679093845628749, 1.8894766694523744, 0.143032365576657],
    marker: { color: 'hsl(0.0,50%,50%)' }
  };
  trace2 = {
    type: 'box',
    y: [2.148380551798316, 1.0854374096667723, 2.3742527016077846, 2.0362930133818082, 2.269794503992078, 1.4670443418113601, 1.2246612466371276, 2.3643710521710943, 2.054894114576519, 2.1741858393591302],
    marker: { color: 'hsl(12.4137931034,50%,50%)' }
  };
  trace3 = {
    type: 'box',
    y: [1.3327671318234522, 2.12999665272797, 1.248777215735134, 2.5961602630949914, 1.3182787375500649, 0.9086357541530751, 1.8804996536176475, 1.1061836781355032, 2.563477620310352, 1.2021651952606236],
    marker: { color: 'hsl(24.8275862069,50%,50%)' }
  };
  trace4 = {
    type: 'box',
    y: [3.148298002741213, 2.0767041288288155, 2.9021862970469634, 2.021155406546565, 2.8009431286859234, 2.0658476134881254, 2.186368251243292, 1.8445695235984063, 1.3546493304307539, 1.469412307782436],
    marker: { color: 'hsl(37.2413793103,50%,50%)' }
  };
  trace5 = {
    type: 'box',
    y: [1.5674520015475526, 1.8452323219425866, 3.188397406794075, 1.9882993933977282, 1.6678242319486352, 2.783454509208993, 1.5581880226825389, 2.2524326949885976, 2.2384819386995227, 2.2511958219254606],
    marker: { color: 'hsl(49.6551724138,50%,50%)' }
  };
  trace6 = {
    type: 'box',
    y: [2.2761916998495795, 2.2888626725443966, 3.4149962253755364, 3.1968549461169093, 3.5978030819436206, 3.7388915498232453, 2.315937374304533, 3.349876493424582, 3.7042274509285855, 2.618292238223142],
    marker: { color: 'hsl(62.0689655172,50%,50%)' }
  };
  trace7 = {
    type: 'box',
    y: [3.048039116632109, 3.842349659526183, 3.0462648609847807, 4.145775216080875, 4.005588063383655, 2.659988947651621, 3.068724933918699, 3.250631545966849, 3.105972423759941, 3.6038499176708787],
    marker: { color: 'hsl(74.4827586207,50%,50%)' }
  };
  trace8 = {
    type: 'box',
    y: [4.438872068151141, 4.330762093316128, 3.7217274020472395, 3.5212207839816347, 4.050947412940434, 3.593599877326779, 3.998000984939188, 3.5894284218810433, 3.0644682538676324, 3.5300551676258394],
    marker: { color: 'hsl(86.8965517241,50%,50%)' }
  };
  trace9 = {
    type: 'box',
    y: [4.642802083897288, 4.351333175053183, 4.144119769035809, 3.084232456660308, 4.666129577647454, 3.4653345093341743, 4.396016787536984, 3.9792059804359274, 4.616184713515055, 4.641758136390595],
    marker: { color: 'hsl(99.3103448276,50%,50%)' }
  };
  trace10 = {
    type: 'box',
    y: [3.53097514287507, 4.419451208512743, 3.676649554686991, 3.9627207262445934, 4.497624541780283, 3.58742343516916, 4.015006669658143, 3.380473166303937, 3.491554675296821, 4.484863050849326],
    marker: { color: 'hsl(111.724137931,50%,50%)' }
  };
  trace11 = {
    type: 'box',
    y: [3.6256717907400784, 3.901514242746616, 4.033724464722213, 3.9594892633088126, 5.097105565014308, 4.213573517687038, 4.444099790707304, 4.7772069876973875, 4.224559930924569, 4.456960938042312],
    marker: { color: 'hsl(124.137931034,50%,50%)' }
  };
  trace12 = {
    type: 'box',
    y: [4.23790218657045, 5.162099289360382, 5.238300461602331, 3.9625448463943425, 3.666290487710959, 4.4669428834781515, 4.348513307645404, 3.864336396787468, 3.8799565305814476, 3.627870114130337],
    marker: { color: 'hsl(136.551724138,50%,50%)' }
  };
  trace13 = {
    type: 'box',
    y: [4.8198979586576325, 5.2428660219773215, 4.223431935842847, 4.89176390809065, 5.3623163768898205, 3.8495361432413158, 4.449813998882297, 4.514793796761055, 4.29043655139185, 4.651669198592859],
    marker: { color: 'hsl(148.965517241,50%,50%)' }
  };
  trace14 = {
    type: 'box',
    y: [4.15502540587276, 4.150210855840842, 4.396538767223425, 4.56390737484893, 4.2566960138476855, 4.620841641537761, 5.089264365778487, 4.94327248557318, 4.24676922295601, 5.03176130709491],
    marker: { color: 'hsl(161.379310345,50%,50%)' }
  };
  trace15 = {
    type: 'box',
    y: [4.877269465052493, 4.356402030798108, 4.7786565056856976, 4.5786410091466525, 4.13356191475155, 4.579752226130177, 5.059873287898635, 4.332428221526065, 4.484667978741224, 5.32110040795875],
    marker: { color: 'hsl(173.793103448,50%,50%)' }
  };
  trace16 = {
    type: 'box',
    y: [4.638559553340771, 4.2518648621818365, 4.504774264164057, 4.734183303056813, 5.01045058943689, 5.050492637696578, 5.055046492943002, 4.810358184634934, 4.677488223536502, 5.448447381702935],
    marker: { color: 'hsl(186.206896552,50%,50%)' }
  };
  trace17 = {
    type: 'box',
    y: [4.118358728369913, 5.411080902990084, 4.446710673638779, 4.923559884372523, 4.364469862114277, 4.162739477658809, 4.697826841189628, 4.128496125062902, 5.413541766328688, 4.320565462937356],
    marker: { color: 'hsl(198.620689655,50%,50%)' }
  };
  trace18 = {
    type: 'box',
    y: [4.458594798098824, 5.1642055304447485, 4.46293411855925, 4.541250932671821, 4.811834361149743, 5.260969162393849, 5.008242120019389, 4.399145590303532, 4.194237264208961, 4.729088975436287],
    marker: { color: 'hsl(211.034482759,50%,50%)' }
  };
  trace19 = {
    type: 'box',
    y: [4.557833379063872, 4.708251874888718, 4.288329629404353, 4.872537768484176, 4.235748806948226, 5.138949991617306, 4.2525013047000115, 4.882041614653546, 4.851260730969277, 4.238693303587272],
    marker: { color: 'hsl(223.448275862,50%,50%)' }
  };
  trace20 = {
    type: 'box',
    y: [4.279718091939169, 4.204741519994435, 4.844409407870657, 3.910041343732009, 4.146579800272098, 4.163826966719372, 5.106499140169963, 4.795401600440059, 4.807987919174039, 3.9825607576656563],
    marker: { color: 'hsl(235.862068966,50%,50%)' }
  };
  trace21 = {
    type: 'box',
    y: [4.934794170857181, 3.783550939545252, 3.9707279676780707, 4.447228839816564, 4.564044455184602, 4.690051160993242, 4.774186816780376, 4.891749383891582, 3.9856874915254616, 4.938014163640504],
    marker: { color: 'hsl(248.275862069,50%,50%)' }
  };
  trace22 = {
    type: 'box',
    y: [4.269142150784525, 4.13324051474692, 4.11991536242453, 3.6705411508893673, 4.259293787304167, 4.021259247687774, 3.687886764906649, 3.8294955903871926, 4.412869834612964, 3.9684207520267574],
    marker: { color: 'hsl(260.689655172,50%,50%)' }
  };
  trace23 = {
    type: 'box',
    y: [4.142195186577529, 3.4395089578848768, 3.9834080970954835, 3.7364248077832283, 3.4724647125070054, 3.80971253657889, 3.4930766574582157, 4.414646797855233, 4.410915568919132, 3.7622186712828145],
    marker: { color: 'hsl(273.103448276,50%,50%)' }
  };
  trace24 = {
    type: 'box',
    y: [3.429164252632626, 3.839215682978939, 3.820064996691866, 3.783923127463686, 3.7690929343755375, 3.6866574474404143, 3.1863591275086285, 3.6837506191497322, 3.5717541067700487, 4.036890998963162],
    marker: { color: 'hsl(285.517241379,50%,50%)' }
  };
  trace25 = {
    type: 'box',
    y: [3.5192765887771302, 3.7539021613941053, 3.7039926031390644, 3.5994576699603194, 2.9599387124882544, 3.373256068615577, 3.2821800510734547, 3.279326448134866, 3.1590836062991836, 3.4387422556320804],
    marker: { color: 'hsl(297.931034483,50%,50%)' }
  };
  trace26 = {
    type: 'box',
    y: [2.7623372008473464, 3.122604458234452, 2.8844523902531423, 3.584534727639981, 3.095422413110983, 3.3941087233436855, 2.873123140978058, 3.135519061030017, 3.394591777376436, 3.3696302928724604],
    marker: { color: 'hsl(310.344827586,50%,50%)' }
  };
  trace27 = {
    type: 'box',
    y: [2.306708958777311, 3.0003404858783695, 2.4569928246140966, 2.964318465835691, 3.11079608560582, 2.6251654735028405, 3.1976518902381206, 2.913403878360426, 2.741509364198727, 2.7429319436379758],
    marker: { color: 'hsl(322.75862069,50%,50%)' }
  };
  trace28 = {
    type: 'box',
    y: [2.710479753977713, 2.124175434780921, 2.3787933589200345, 2.0008400416717413, 2.1930381734992106, 2.1936915399625336, 2.343723475024169, 2.2457902984391995, 2.0212512190227443, 2.5266909186501367],
    marker: { color: 'hsl(335.172413793,50%,50%)' }
  };
  trace29 = {
    type: 'box',
    y: [2.616852269262763, 2.322508216083808, 2.153820717242049, 1.7146805769580364, 1.8610044127072118, 2.5069111965411346, 1.9829687535674252, 2.473540829931427, 2.4122187930673427, 2.024641339276226],
    marker: { color: 'hsl(347.586206897,50%,50%)' }
  };
  trace30 = {
    type: 'box',
    y: [1.6034125681056535, 1.376003394546358, 1.509500897317136, 1.7233132948028638, 2.1639905286750785, 1.6990697587692378, 2.149303130773391, 1.3445311801082984, 1.8973770948428723, 2.02623232029271],
    marker: { color: 'hsl(360.0,50%,50%)' }
  };
  data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10, trace11, trace12, trace13, trace14, trace15, trace16, trace17, trace18, trace19, trace20, trace21, trace22, trace23, trace24, trace25, trace26, trace27, trace28, trace29, trace30];
  Plotly.plot('plotDiv2', data, {
    title: 'Title',
    updatemenus: [{
      direction: 'left',
      showactive: false,
      type: 'buttons',
      x: 0,
      xanchor: 'left',
      y: 1.2,
      yanchor: 'top'
    }]
  });

  var trace1 = {
    histfunc: "sum",
    name: 'Pre-treatment',
    type: "histogram",
    opacity: 0.5,
    marker: {
      color: 'green',
    },
    xbins: {
      end: 100,
      size: 5,
      start: 1
    }
  };
  var trace2 = {
    histfunc: "sum",
    name: 'Post-treatment',
    type: "histogram",
    opacity: 0.6,
    marker: {
      color: 'red',
    },
    xbins: {
      end: 100,
      size: 5,
      start: 1
    }
  };

  var data = [trace1, trace2];
  var layout = {
    barmode: "stack",
    title: 'CDR3 Length',
    yaxis: {
      title: 'CDR3 Quantity',
      zeroline: false
    },
    xaxis: {
      title: 'Average CDR3 length',
      tickvals: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      ticktext: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, '100+']
    }
  };
  Plotly.newPlot("plotDiv3", data, layout);


  // URL location hash show/hide support
  if (window.location.pathname.split('/').pop() == 'cohort_analysis.html') {
    if (location.hash == "") {
      $('.content_row').show();
    } else if ($.inArray(location.hash, ["#DYN", "#STAT"]) >= 0) {
      var classes = {};
      classes['#DYN'] = '.dynamic';
      classes['#STAT'] = '.static';
      $('.content_row').hide();
      $(classes[location.hash]).show();
    } else {
      $('.content_row').hide();
      $(types[location.hash]).show();
    }
  }

  data_load("data/out/pre.csv", "data/out/post.csv");

  $("#dropdownCondition").text("Treatment");

  $("#dropdownChain").text("TRA");

});

var currentChain = "TRA";

function chainChange(a) {
  var update = {
    x: [Object.keys(cond1_data[a])],
    y: [Object.values(cond1_data[a])],
  }
  Plotly.restyle('plotDiv3', update, 0);
  var update = {
    x: [Object.keys(cond2_data[a])],
    y: [Object.values(cond2_data[a])],
  }
  Plotly.restyle('plotDiv3', update, 1);

  $("#dropdownChain").text(a);

  currentChain = a;

}

function conditionChange(a, b, c, d, e) {

  data_load(a, b, d, e);

  $("#dropdownCondition").text(c);

}

function hideOrShow(a, b) {
  var update = {
    visible: a
  }
  Plotly.restyle(b, update);
}
