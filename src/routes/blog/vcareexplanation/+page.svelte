<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import Snippet from "$lib/Snippet.svelte";
  import c from "svelte-highlight/languages/c";
</script>

<BlogHeader title="VC31 explanation" />
<p>
  Espruino recently added a blob from the manufacturer of the HRM sensor, VCare, to improve its
  accuracy. This post will try to explain the Algo_Input function.
</p>
<h2>Decompilation</h2>
<Snippet
  language={c}
  code={`void Algo_Input(int* param_1, int param_2, int param_3, int param_4)

{
  undefined4 uVar1;
  int iVar2;
  int iVar3;
  int iVar4;
  int iVar5;
  int iVar6;
  uint uVar7;
  uint uVar8;
  int iVar9;
  uint uVar10;
  bool bVar11;
  bool bVar12;
  undefined4 uVar13;
  int* piVar14;
  int iVar15;
  undefined4 local_c0[3];
  int local_b4;
  undefined auStack_ac[96];
  undefined4 local_4c;
  undefined4 local_48[2];
  int local_40;
  int local_3c;
  undefined4 local_38;
  int* piStack_34;
  int iStack_30;
  int iStack_2c;
  int local_28;

  local_4c = 0;
  local_48[0] = 0;
  local_40 = 0;
  local_3c = 0;
  isBusy = 1;
  uVar8 = 0;
  uVar10 = 0;
  interTime = interTime + param_2;
  iVar2 = interCnt + 1;
  if (param_2 > 60) {
    iVar2 = interCnt;
  }
  interCnt = iVar2;
  piStack_34 = param_1;
  iStack_30 = param_2;
  iStack_2c = param_3;
  local_28 = param_4;
  if (interTime > 970) {
    uVar8 = 25 - interCnt;
    if ((int)uVar8 < 0) {
      uVar8 = 0;
    }
    interCnt = 0;
    interTime = 0;
    if ((int)uVar8 < 18) {
      if ((int)uVar8 < 1)
        goto label_6;
    } else {
      uVar8 = 18;
    }
    uVar10 = 1;
  }
  do {
    if (uVar8 == 0 || uVar10 == 0) {
      preRawdata._12_4_ = param_1[3];
      preRawdata._16_4_ = param_1[4];
      preRawdata._0_4_ = *param_1;
      preRawdata._4_4_ = param_1[1];
      preRawdata._8_4_ = param_1[2];
      if (param_3 == 18) {
        preRawdata._0_4_ = preRawdata._0_4_ << 2;
        preRawdata._4_4_ = preRawdata._4_4_ << 2;
        preRawdata._8_4_ = preRawdata._8_4_ << 2;
      }
    }
    if ((uVar8 == 0) && (uVar10 != 0)) {
      preRawdata._12_4_ = preRawdata._12_4_ + 4096;
    }
    modle5_2(preRawdata, local_c0, &local_3c);
    iVar2 = local_b4;
    if (preAccnorm == 0) {
      preAccnorm = local_3c;
    }
    iVar9 = local_3c - preAccnorm;
    bus = iVar9 * 16;
    if (bus < 0) {
      bus = iVar9 * -16;
    }
    prePPGUC = prePPGUC + ((bus - prePPGUC) * 261 + 16384 >> 15);
    if (prePPGUC > 255) {
      prePPGUC = 256;
    }
    if (prePPGUC < -255) {
      prePPGUC = -256;
    }
    if (iVar9 < 0) {
      iVar9 = -iVar9;
    }
    preAccnorm = local_3c;
    if (accGapMax <= iVar9) {
      accGapMax = iVar9;
    }
    if (param_3 == 1) {
      param_3 = 2;
    label_1:
      if (prePPGAfterFilter == 0) {
        prePPGAfterFilter = local_b4;
      }
      iVar3 = prePPGAfterFilter - local_b4;
      if (iVar3 < 0) {
        iVar3 = -iVar3;
      }
      if (iVar3 > 4799) {
        ppgPower25Hz = local_b4;
        local_b4 = prePPGAfterFilter;
      }
      prePPGAfterFilter = iVar2;
    } else if (param_3 == 2)
      goto label_1;
    uVar1 = modle5_11(local_b4);
    PPGpowerReal = modle5_10(local_b4);
    modle5_17(local_c0, param_3, iVar9);
    iVar2 = modle5_1();
    iVar9 = modle5_9(preRawdata);
    iVar3 = modle5_18(preRawdata, local_c0[0]);
    local_38 = modle5_7();
    iVar4 = modle5_3(iVar3);
    bigbus = iVar4;
    modle5_13(iVar2 << 4, RLCGroup, auStack_ac);
    oneSecondCnt = oneSecondCnt + '\x01';
    if (prePPGUC < 96) {
      absoluteStillCnt = absoluteStillCnt + 1;
    } else {
      absoluteStillCnt = 0;
    }
    if (local_28 == 0) {
      absoluteStillCnt = 0;
    } else if (199 < absoluteStillCnt) {
      absoluteStillCnt = 200;
    }
    if ('\x18' < oneSecondCnt) {
      oneSecondCnt = '\0';
      rlcSwitchCnt = rlcSwitchCnt + 1;
      modle5_15(auStack_ac, lockOn, firstLock, (undefined4)enhanceRange,
                enhanceRange._4_4_, (undefined4)dampingRange,
                dampingRange._4_4_);
      preRawheartRate = heartRate;
      preRawReliability = reliability;
      modle5_14(auStack_ac, &local_4c, &heartRate, local_48);
      reliability =
          modle5_8(auStack_ac, local_48[0], local_4c, iVar9, &PPGpowerFromSpec);
      if ((PPGpowerReal < 0) && (firstLock == '\0')) {
        reliability = 0;
      }
      uVar7 = (uint)(absoluteStillCnt == 200);
      if (runningAlltime < 30) {
        runningAlltime = runningAlltime + 1;
      }
      iVar5 = preRawReliability - reliability;
      iVar2 = iVar5;
      if (iVar5 < 0) {
        iVar2 = -iVar5;
      }
      if ((iVar2 * 100 + 128 >> 8 < 5) &&
          (79 < (reliability * 100 + 128) >> 8)) {
        signalSafeGuardCnt = signalSafeGuardCnt + 1;
        if (4 < signalSafeGuardCnt) {
          absoluteStillCnt = 0;
          uVar7 = 0;
          signalSafeGuardCnt = 5;
        }
      } else {
        signalSafeGuardCnt = 0;
      }
      if (((firstLock == '\0') && (15 < iVar5 * 100 + 128 >> 8)) &&
          (runningAlltime == 30)) {
        ProtectTic = 5;
        if ((param_3 == 0) && (local_40 == 1)) {
          ProtectTic = 300;
        }
      label_2:
        ProtectTic = ProtectTic + -1;
      } else if (ProtectTic != 0)
        goto label_2;
      iVar2 = preRawheartRate - heartRate;
      if (param_3 == 0) {
        if (ProtectTic == 0) {
          if (iVar2 + 12800 < 0 != SCARRY4(iVar2, 12800)) {
            bVar12 = SBORROW4(heartRate, 35840);
            iVar5 = heartRate + -35840;
            bVar11 = heartRate == 35840;
            if (heartRate > 35840)
              goto label_3;
          }
        } else if (iVar2 < 1) {
          if (preRawheartRate < 23041) {
            if (iVar2 + 2560 < 1280) {
              heartRate = preRawheartRate - iVar2 / 2;
            }
            if (iVar2 + 3840 < 1280) {
              heartRate = preRawheartRate + 512;
            }
            if (iVar2 + 3840 < 0 != SCARRY4(iVar2, 3840)) {
              heartRate = preRawheartRate;
            }
          }
          if (preRawheartRate - 23040U < 5121) {
            if (iVar2 + 2560U < 1280) {
              heartRate = preRawheartRate + 256;
            }
            if (iVar2 + 2560 < 0 != SCARRY4(iVar2, 2560)) {
              heartRate = preRawheartRate;
            }
          }
          if (28160 < preRawheartRate) {
            if (iVar2 + 3840U < 1280) {
              heartRate = preRawheartRate + 512;
            }
            if (iVar2 + 3840 < 0 != SCARRY4(iVar2, 3840))
              goto label_4;
          }
        } else if (preRawheartRate < 28161) {
          if (iVar2 - 2561U < 1280) {
            heartRate = preRawheartRate + -1280;
          }
          bVar12 = SBORROW4(iVar2, 3840);
          iVar5 = iVar2 + -3840;
          bVar11 = iVar2 == 3840;
        label_3:
          if (!bVar11 && iVar5 < 0 == bVar12)
            goto label_4;
        }
      } else if (ProtectTic != 0) {
        if ((iVar2 + 7680 < 0 != SCARRY4(iVar2, 7680)) &&
            (heartRate > 40960)) {
          heartRate = preRawheartRate;
        }
        if ((iVar2 > 5120) && (heartRate < 16640)) {
        label_4:
          heartRate = preRawheartRate;
        }
      }
      piVar14 = &local_40;
      iVar3 = iVar3 >> 4;
      if (iVar9 != 0) {
        iVar9 = 1;
      }
      uVar13 = local_38;
      iVar2 = iVar4;
      iVar5 = preHR;
      iVar15 = param_3;
      modle5_5(&HRlast);
      if (0 < badSignalCnt) {
        badSignalCnt = badSignalCnt + -1;
      }
      iVar6 = HRlast;
      if (accGapMax < 60000) {
        if ((0 < badSignalCnt) || ((ProtectTic != 0 && (param_3 == 0))))
          goto label_5;
      } else {
        badSignalCnt = 30;
      label_5:
        if (HRpatch != 0) {
          if (HRlast - HRpatch < 1280) {
            iVar6 = HRpatch + ((HRlast - HRpatch) * 405 >> 13);
          } else {
            iVar6 = HRpatch + 63;
          }
        }
      }
      HRpatch = iVar6;
      if ((iVar6 - preHR) + 256U < 513) {
        HRpatch = preHR;
      }
      if ((iVar4 < 81) && (37119 < HRlast)) {
        if (abnormalHighHRCnt < 30) {
          abnormalHighHRCnt = abnormalHighHRCnt + 1;
        }
      } else {
        abnormalHighHRCnt = 0;
      }
      if (firstLock != '\0') {
        param_3 = 1;
      }
      if (abnormalHighHRCnt == 30) {
        HRlast = HRlast >> 1;
        param_3 = 0;
      }
      preHR = HRpatch;
      if (rlcSwitchCnt == 1) {
        modle5_4(HRlast + 128, firstLock, iVar4, RLCGroup, local_40, param_3,
                  1, uVar13, iVar9, iVar3, uVar1, iVar2, iVar5, piVar14, iVar15,
                  uVar7);
        rlcSwitchCnt = 0;
      }
      if (firstLock != '\0') {
        iVar2 = 0;
        do {
          RLCGroup[iVar2] = 1;
          iVar2 = iVar2 + 1;
        } while (iVar2 < 12);
      }
      accGapMax = 0;
    }
    uVar8 = uVar8 - 1;
  label_6:
    if ((int)uVar8 < 0) {
      isBusy = 0;
      return;
    }
  } while (true);
}`}
/>
<p class="italic">
  Source: Ghidra <a href="https://dogbolt.org/">(Dogbolt)</a> +
  <a href="http://format.krzaq.cc/">http://format.krzaq.cc</a> + unhexing by me
</p>
<h2>Explanation by GPT-4</h2>
<p>
  (This function is quite complex without a concrete context and uses many variables and functions
  that are not defined within its scope. I will explain as much as possible based on the variables
  and logic provided within the function itself.)
</p>
<p>
  The input to the function <code>Algo_Input</code> is four parameters.
</p>
<ul>
  <li>
    <code>param_1</code>: It is a pointer to the first element of an integer array.
  </li>
  <li>
    <code>param_2</code>, <code>param_3</code>, <code>param_4</code>: They are integers.
  </li>
</ul>
<p>
  This function appears to be part of a heart rate monitoring system, with some algorithm
  calculating beats per minute (BPM) from raw input data.
</p>

<p>
  The function first does some initial calculation and preparation using
  <code>param_2</code> and <code>param_3</code>. These likely represent some raw data inputs. These
  values are used to calculate an
  <code>interTime</code> and <code>interCnt</code>, which might represent some type of intermediate
  calculation.
</p>
<p>
  A major part of the function seems to be a loop, probably processing a batch of new heart rate
  data. The function seems to be in readiness to calculate bpm even if the <code>interTime</code> value
  is greater than a threshold (970), which is probably some time duration.
</p>
<p>
  Within this loop, the function performs preprocessing operations on raw input, via operations like
  shifting or adding depending on
  <code>param_3</code>. Then various methods are called that handle the data further, likely
  filtering and normalising it. These are likely correlated to heart rate signal processing methods
  which are commonly used in heart rate sensor algorithms. Variables like
  <code>preAccnorm</code>, <code>bus</code>, <code>prePPGUC</code>, etc are used, to indicate these
  might be values linked to accelerometer data and PPG (photoplethysmography) sensor data.
</p>
<p>
  There is seemingly an accumulative process where the cumulative sum of
  <code>absoluteStillCnt</code> is computed whenever
  <code>param_3</code> is nonzero, which may indicate the device being still. This implies the
  algorithm recognizes user's motion state based on the acceleration norm value provided in
  <code>param_1</code> and modifies its behavior accordingly.
</p>
<p>
  There are also several operations checking and adjusting the heart rate value (<code
    >heartRate</code
  >) if certain conditions apply. The measures of reliability are considered and safety checks on
  the signal are in place (<code>signalSafeGuardCnt</code>), ensuring the data's integrity isn't
  compromised.
</p>
<p>
  Towards the end of the function, adjustments are made to the final heart rate (HR) output
  according to certain conditions (<code>HRpatch</code>,
  <code>HRlast</code>), for example, abnormal HR is detected and adjusted by halving the
  <code>HRlast</code>.
</p>
<p>
  Overall, this code seems to be a mix of processes related to signal processing, safety checks, and
  adjustments based on real-time information and measurements, adapting accordingly.
</p>
<p>
  Disclaimer: This is a qualified guess based on the provided code. Some parts may not be accurate
  due to a lack of specific details and context.
</p>
<h2>Explanation by Gemini 2.5 Pro</h2>
<p>
  The <code>Algo_Input</code> function serves as the main data processing entry point for the VC31 heart
  rate algorithm blob. It&#39;s called repeatedly with batches of raw sensor data (PPG and likely 3-axis
  Accelerometer) and the time elapsed since the last call.
</p>
<p><strong>Core Functionality:</strong></p>
<ol>
  <li>
    <strong>Data Ingestion &amp; Timekeeping:</strong> It takes the raw sensor array (<code
      >param_1</code
    >), time delta (<code>param_2</code>), and mode flags (<code>param_3</code>,
    <code>param_4</code>). It maintains internal time counters and handles potential time gaps by
    running processing loops iteratively to &quot;catch up&quot; if needed.
  </li>
  <li>
    <strong>Per-Sample Processing:</strong> For each sample (or interpolated sample during
    catch-up), it extracts features:
    <ul>
      <li>Calculates the accelerometer vector magnitude (norm).</li>
      <li>
        Derives a motion metric based on the <em>change</em> in ACC norm (likely smoothed with an IIR
        filter).
      </li>
      <li>Applies initial filtering to the raw PPG signal(s).</li>
    </ul>
  </li>
  <li>
    <strong>~1Hz Processing Block:</strong> Roughly once per second, it performs the main HR
    calculation:
    <ul>
      <li>
        <strong>Spectral Analysis:</strong> It likely uses accumulated PPG data from the past second
        to perform spectral analysis (FFT or autocorrelation via internal <code>modle5_x</code> functions)
        to find the dominant frequency corresponding to the heart rate.
      </li>
      <li>
        <strong>HR &amp; Reliability Estimation:</strong> Extracts the raw heart rate estimate from the
        spectral peak and calculates a confidence/reliability score based on signal quality metrics (peak
        strength, noise levels, consistency).
      </li>
      <li>
        <strong>Motion-Aware Smoothing:</strong> Applies significant stateful smoothing and
        filtering to the raw HR estimate. This stage heavily considers the calculated motion
        metrics, signal reliability trends, operating mode (<code>param_3</code>), and recent HR
        history to prevent erratic outputs, especially during motion or low signal quality periods.
        It uses mechanisms like <code>ProtectTic</code> to temporarily enforce stronger smoothing after
        stability disruptions.
      </li>
      <li>
        <strong>Adaptive Feedback:</strong> The calculated HR, reliability, and motion status are
        fed back into the algorithm&#39;s internal state (<code>modle5_4</code>), likely tuning
        filter parameters, frequency tracking ranges (<code>RLCGroup</code>), or other coefficients
        for the <em>next</em> processing cycle.
      </li>
    </ul>
  </li>
  <li>
    <strong>State Management:</strong> The function relies heavily on static/global variables to maintain
    context (previous sensor values, filtered signals, HR history, motion counters, lock status, etc.)
    between calls.
  </li>
</ol>
<p><strong>Key Technical Concepts Employed:</strong></p>
<ul>
  <li><strong>Sensor Fusion:</strong> Combines PPG and Accelerometer data.</li>
  <li>
    <strong>Motion Artifact Reduction:</strong> Uses ACC data to identify and mitigate motion&#39;s impact
    on the PPG signal and HR calculation.
  </li>
  <li>
    <strong>Spectral Analysis:</strong> Core technique for extracting periodicity (heart rate) from the
    PPG signal.
  </li>
  <li>
    <strong>Adaptive Filtering:</strong> Algorithm parameters likely adjust based on real-time conditions
    (motion, signal quality, current HR).
  </li>
  <li>
    <strong>Stateful Processing:</strong> Output depends not just on current input but on the history
    stored in internal variables.
  </li>
  <li>
    <strong>Robustness Logic:</strong> Includes checks for signal quality, stability, abnormal HR values,
    and applies varying levels of smoothing accordingly.
  </li>
</ul>
<p>
  In essence, it&#39;s a classic embedded HRM pipeline: ingest raw data, filter/preprocess, use
  spectral methods to find HR frequency, assess signal quality, apply motion-aware smoothing, and
  adapt internal parameters over time. The complexity lies within the proprietary <code
    >modle5_x</code
  > functions implementing the core signal processing math and the intricate state-based logic for smoothing
  and adaptation.
</p>
