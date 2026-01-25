<script module>
  export const date = "2025-05-01";
</script>

<script>
  import python from "svelte-highlight/languages/python";
  import BlogHeader from "$lib/BlogHeader.svelte";
  import Snippet from "$lib/Snippet.svelte";
</script>

<BlogHeader {date} title="Humanity's Last Exam baseline" />
<p>
  We should not freak out over a 1.7B model getting 4.8% on Humanity's Last Exam - the random
  guessing baseline is around 4.65%.
</p>
<p>These numbers came from Claude. First, let's estimate with math:</p>
<math>
  <mfrac>
    <mrow>
      <mn>590</mn>
      <mo>⋅</mo>
      <mn>0.1625</mn>
      <mo>+</mo>
      <mn>557</mn>
      <mo>⋅</mo>
      <mn>0.001</mn>
      <mo>+</mo>
      <mn>38</mn>
      <mo>⋅</mo>
      <mn>0.5</mn>
      <mo>+</mo>
      <mn>30</mn>
      <mo>⋅</mo>
      <mn>0.0001</mn>
      <mo>+</mo>
      <mn>19</mn>
      <mo>⋅</mo>
      <mn>0.0385</mn>
      <mo>+</mo>
      <mn>1264</mn>
      <mo>⋅</mo>
      <mn>0</mn>
    </mrow>
    <mn>2500</mn>
  </mfrac>
  <mo>≈</mo>
  <mn>0.0465</mn>
</math>
<p>
  That's a 16.25% chance on 590x multiple choice, 0.1% chance on 557x simple numbers, 50% chance on
  38x yes/no, 0.01% chance on 30x fractions, 3.85% chance on 19x single letters, and a 0% chance on
  the other 1264 complex questions.
</p>
<p>You could also verify this number with a more complex simulation.</p>
<details>
  <summary>Code</summary>
  <Snippet
    language={python}
    code={"# /// script\n# dependencies = [\n#     \"pandas\",\n#     \"pyarrow\",\n# ]\n# ///\n\nimport pandas as pd\nimport re\nimport random\nimport string\nfrom collections import Counter\n\n# Set random seed for reproducibility\nrandom.seed(42)\n\n# Number of simulation runs\nNUM_RUNS = 20\n\n# Load the parquet file\ndf = pd.read_parquet('test-00000-of-00001.parquet')\nprint(f\"Total questions: {len(df)}\")\n\n# Function to count choices in a multiple choice question\ndef count_choices(question_text):\n    choice_patterns = [\n        r'[A-Z]\\.\\s', # A. Option\n        r'[A-Z]\\)\\s', # A) Option\n        r'\\([A-Z]\\)\\s', # (A) Option\n        r'[A-Z]:\\s', # A: Option\n        r'^\\s*[A-Z]\\s' # A Option (at the beginning of a line)\n    ]\n    \n    if \"Answer Choices:\" in question_text:\n        lines = question_text.split('\\n')\n        choices = [line for line in lines if re.match(r'^\\s*[A-Z]\\.', line.strip())]\n        if choices:\n            return len(choices)\n    \n    for pattern in choice_patterns:\n        choices = re.findall(pattern, question_text)\n        if choices:\n            choice_letters = set([c.strip()[0] for c in choices])\n            if len(choice_letters) >= 2:\n                return len(choice_letters)\n    \n    # Default to 5 if pattern matching fails but it's a multiple choice question\n    return 5\n\n# Function to detect answer type\ndef detect_answer_type(answer):\n    answer_str = str(answer).strip().lower()\n    \n    # Single letter\n    if re.match(r'^[a-z]$', answer_str):\n        return 'single_letter'\n    \n    # Yes/No\n    if answer_str in ['yes', 'no']:\n        return 'yes_no'\n    \n    # True/False\n    if answer_str in ['true', 'false']:\n        return 'true_false'\n    \n    # Simple number\n    if re.match(r'^-?\\d+(\\.\\d+)?$', answer_str):\n        return 'simple_number'\n    \n    # Fraction\n    if re.match(r'^-?\\d+/\\d+$', answer_str):\n        return 'fraction'\n    \n    # Scientific notation\n    if re.match(r'^-?\\d+(\\.\\d+)?e[+-]?\\d+$', answer_str, re.IGNORECASE):\n        return 'scientific'\n    \n    # Default for complex free response\n    return 'complex_free_response'\n\n# Function to generate a random guess based on answer type\ndef generate_random_guess(answer_type, num_choices=None):\n    if answer_type == 'multipleChoice':\n        # Randomly select a letter from A to whatever is the max choice\n        max_choice = min(num_choices, 26) if num_choices else 5  # Default to 5 if unsure\n        return random.choice(string.ascii_uppercase[:max_choice])\n    \n    elif answer_type == 'single_letter':\n        return random.choice(string.ascii_lowercase)\n    \n    elif answer_type == 'yes_no':\n        return random.choice(['yes', 'no'])\n    \n    elif answer_type == 'true_false':\n        return random.choice(['true', 'false'])\n    \n    elif answer_type == 'simple_number':\n        # Generate a random integer between -100 and 1000\n        return str(random.randint(-100, 1000))\n    \n    elif answer_type == 'fraction':\n        # Generate a random fraction\n        numerator = random.randint(1, 100)\n        denominator = random.randint(1, 100)\n        return f\"{numerator}/{denominator}\"\n    \n    elif answer_type == 'scientific':\n        # Generate a random number in scientific notation\n        mantissa = random.uniform(1, 10)\n        exponent = random.randint(-10, 10)\n        return f\"{mantissa:.2f}e{exponent}\"\n    \n    else:  # complex_free_response\n        # Generate a random string (will almost certainly be wrong)\n        length = random.randint(3, 20)\n        return ''.join(random.choice(string.ascii_lowercase) for _ in range(length))\n\n# Function to check exact match with case variations\ndef check_match(guess, actual):\n    guess_str = str(guess).strip()\n    actual_str = str(actual).strip()\n    \n    # Try exact match\n    if guess_str == actual_str:\n        return True\n    \n    # Try case-insensitive match\n    if guess_str.lower() == actual_str.lower():\n        return True\n    \n    # For yes/no and true/false, try matching first letter only\n    if guess_str.lower() in ['yes', 'no', 'true', 'false'] and len(actual_str) >= 1:\n        if guess_str.lower()[0] == actual_str.lower()[0]:\n            return True\n    \n    return False\n\n# Run simulation multiple times\nall_accuracies = []\nall_type_results = {}\n\nfor run in range(NUM_RUNS):\n    print(f\"\\nRun {run+1}/{NUM_RUNS}\")\n    correct_count = 0\n    answer_type_guesses = Counter()\n    answer_type_correct = Counter()\n    \n    for idx, row in df.iterrows():\n        answer_type = row['answer_type']\n        actual_answer = str(row['answer']).strip()\n        \n        if answer_type == 'multipleChoice':\n            # Count the number of choices\n            num_choices = count_choices(row['question'])\n            guess = generate_random_guess(answer_type, num_choices)\n            \n            # For multiple choice, normalize answers to just the letter\n            actual_letter = actual_answer[0].upper() if actual_answer and actual_answer[0].upper() in string.ascii_uppercase else actual_answer\n            \n            answer_type_guesses['multipleChoice'] += 1\n            if guess == actual_letter:\n                correct_count += 1\n                answer_type_correct['multipleChoice'] += 1\n        \n        else:  # exactMatch\n            # Detect the specific type of free response answer\n            specific_type = detect_answer_type(actual_answer)\n            guess = generate_random_guess(specific_type)\n            \n            answer_type_guesses[specific_type] += 1\n            if check_match(guess, actual_answer):\n                correct_count += 1\n                answer_type_correct[specific_type] += 1\n    \n    # Calculate accuracy for this run\n    accuracy = correct_count / len(df) * 100\n    all_accuracies.append(accuracy)\n    \n    print(f\"Correct guesses: {correct_count} out of {len(df)}\")\n    print(f\"Random guessing accuracy: {accuracy:.2f}%\")\n    \n    # Store type results for later analysis\n    for answer_type, count in answer_type_guesses.items():\n        if answer_type not in all_type_results:\n            all_type_results[answer_type] = {'total': 0, 'correct': 0}\n        \n        all_type_results[answer_type]['total'] += count\n        all_type_results[answer_type]['correct'] += answer_type_correct.get(answer_type, 0)\n\n# Overall results\navg_accuracy = sum(all_accuracies) / NUM_RUNS\nmin_accuracy = min(all_accuracies)\nmax_accuracy = max(all_accuracies)\nstd_dev = (sum((x - avg_accuracy) ** 2 for x in all_accuracies) / NUM_RUNS) ** 0.5\n\nprint(f\"\\nOverall Results ({NUM_RUNS} runs):\")\nprint(f\"Average random guessing accuracy: {avg_accuracy:.2f}% (standard deviation: {std_dev:.2f}%)\")\nprint(f\"Min accuracy: {min_accuracy:.2f}%\")\nprint(f\"Max accuracy: {max_accuracy:.2f}%\")\nprint(f\"Range: {max_accuracy - min_accuracy:.2f}%\")\n\n# Accuracy by question type across all runs\nprint(\"\\nAccuracy by question type (averaged across all runs):\")\nfor qtype, results in sorted(all_type_results.items(), key=lambda x: x[1]['total'], reverse=True):\n    avg_count = results['total'] / NUM_RUNS\n    avg_correct = results['correct'] / NUM_RUNS\n    type_accuracy = (results['correct'] / results['total']) * 100 if results['total'] > 0 else 0\n    print(f\"{qtype}: {avg_correct:.2f} correct out of {avg_count:.2f} ({type_accuracy:.2f}%)\")\n\n# Recalculate theoretical probability\nprint(\"\\nRecalculated theoretical random guessing probability:\")\nmc_prob = all_type_results['multipleChoice']['correct'] / all_type_results['multipleChoice']['total'] if all_type_results['multipleChoice']['total'] > 0 else 0\nyes_no_prob = all_type_results['yes_no']['correct'] / all_type_results['yes_no']['total'] if 'yes_no' in all_type_results and all_type_results['yes_no']['total'] > 0 else 0\ntrue_false_prob = all_type_results['true_false']['correct'] / all_type_results['true_false']['total'] if 'true_false' in all_type_results and all_type_results['true_false']['total'] > 0 else 0\nsingle_letter_prob = all_type_results['single_letter']['correct'] / all_type_results['single_letter']['total'] if all_type_results['single_letter']['total'] > 0 else 0\nsimple_number_prob = all_type_results['simple_number']['correct'] / all_type_results['simple_number']['total'] if all_type_results['simple_number']['total'] > 0 else 0\n\nmc_count = all_type_results['multipleChoice']['total'] / NUM_RUNS\nyes_no_count = all_type_results['yes_no']['total'] / NUM_RUNS if 'yes_no' in all_type_results else 0\ntrue_false_count = all_type_results['true_false']['total'] / NUM_RUNS if 'true_false' in all_type_results else 0\nsingle_letter_count = all_type_results['single_letter']['total'] / NUM_RUNS\nsimple_number_count = all_type_results['simple_number']['total'] / NUM_RUNS\nfraction_count = all_type_results['fraction']['total'] / NUM_RUNS if 'fraction' in all_type_results else 0\ncomplex_count = all_type_results['complex_free_response']['total'] / NUM_RUNS\n\ntheoretical_correct = (mc_count * mc_prob) + \\\n                     (yes_no_count * yes_no_prob) + \\\n                     (true_false_count * true_false_prob) + \\\n                     (single_letter_count * single_letter_prob) + \\\n                     (simple_number_count * simple_number_prob)\n                    \ntheoretical_accuracy = theoretical_correct / len(df) * 100\n\nprint(f\"Updated equation:\")\nprint(f\"({mc_count} * {mc_prob*100:.2f}% + {yes_no_count} * {yes_no_prob*100:.2f}% + {true_false_count} * {true_false_prob*100:.2f}% + {single_letter_count} * {single_letter_prob*100:.2f}% + {simple_number_count} * {simple_number_prob*100:.2f}%) / {len(df)}\")\nprint(f\"= {theoretical_correct:.2f} / {len(df)} = {theoretical_accuracy:.2f}%\")\n\nprint(f\"\\nCompared to previous theoretical calculation: 4.65%\")\nprint(f\"Compared to simulation average: {avg_accuracy:.2f}%\")\n"}
  />
</details>
<p>This double check is just 0.02% off - 4.63%.</p>
