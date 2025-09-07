// Shared data for videos, manuals, tools, and DevOps experiments
window.VTU_DATA = (function(){
  const videos = [
    { id: 'vid1', title: 'Intro to Lab Safety', desc: 'Rules and best practices', thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', youtubeId: 'dQw4w9WgXcQ' },
    { id: 'vid2', title: 'Basic Git Workflow', desc: 'Clone, commit, push', thumb: 'https://img.youtube.com/vi/USjZcfj8yxE/hqdefault.jpg', youtubeId: 'USjZcfj8yxE' },
    { id: 'vid3', title: 'Docker 101', desc: 'Images and containers', thumb: 'https://img.youtube.com/vi/Gjnup-PuquQ/hqdefault.jpg', youtubeId: 'Gjnup-PuquQ' },
    { id: 'vid4', title: 'Kubernetes Basics', desc: 'Pods, services, deployments', thumb: 'https://img.youtube.com/vi/X48VuDVv0do/hqdefault.jpg', youtubeId: 'X48VuDVv0do' },
    { id: 'vid5', title: 'CI/CD Overview', desc: 'Automated pipelines', thumb: 'https://img.youtube.com/vi/SCZuk2K3Qx0/hqdefault.jpg', youtubeId: 'SCZuk2K3Qx0' },
    { id: 'vid6', title: 'Linux Essentials', desc: 'Commands and navigation', thumb: 'https://img.youtube.com/vi/ROjZy1WbCIA/hqdefault.jpg', youtubeId: 'ROjZy1WbCIA' },
  ];

  const manuals = [
    { id: 'm1', title: 'Experiment 1: Git Basics', text: 'Objectives: Initialize, commit, push. Procedure: ...', pdf: '#' },
    { id: 'm2', title: 'Experiment 2: Branching and Merging', text: 'Objectives: Branching strategies. Procedure: ...', pdf: '#' },
    { id: 'm3', title: 'Experiment 3: Docker Image Build', text: 'Objectives: Build and run. Procedure: ...', pdf: '#' },
    { id: 'm4', title: 'Experiment 4: Docker Compose', text: 'Objectives: Multi-service apps. Procedure: ...', pdf: '#' },
    { id: 'm5', title: 'Experiment 5: CI with GitHub Actions', text: 'Objectives: Setup workflow. Procedure: ...', pdf: '#' },
    { id: 'm6', title: 'Experiment 6: Kubernetes Deployment', text: 'Objectives: Deploy app. Procedure: ...', pdf: '#' },
  ];

  const tools = [
    { id: 't1', title: 'Git', desc: 'Version control system', link: 'https://git-scm.com/', icon: 'https://avatars.githubusercontent.com/u/18133?s=200&v=4' },
    { id: 't2', title: 'VS Code', desc: 'Code editor by Microsoft', link: 'https://code.visualstudio.com/', icon: 'https://code.visualstudio.com/assets/apple-touch-icon.png' },
    { id: 't3', title: 'Docker Desktop', desc: 'Container runtime & tools', link: 'https://www.docker.com/products/docker-desktop/', icon: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png' },
    { id: 't4', title: 'Node.js', desc: 'Runtime for tooling/scripts', link: 'https://nodejs.org/', icon: 'https://nodejs.org/static/images/favicons/favicon-32x32.png' },
    { id: 't5', title: 'Kubectl', desc: 'Kubernetes CLI', link: 'https://kubernetes.io/docs/tasks/tools/', icon: 'https://kubernetes.io/images/favicon.png' },
    { id: 't6', title: 'Postman', desc: 'API client', link: 'https://www.postman.com/downloads/', icon: 'https://assets.getpostman.com/common-share/postman-logo-horizontal-white.svg' },
  ];

  const devopsExperiments = Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    
    // Special case for Experiment 2 - Maven
    if (n === 2) {
      return {
        id: `exp-${n}`,
        title: `Experiment ${n}: Working with Maven`,
        subtitle: 'Creating a Maven Project, Understanding the POM File, Dependency Management and Plugins',
        video: 'exp-2.mp4',
        thumbnail: 'https://maven.apache.org/images/maven-logo-black-on-white.png',
        tools: ['Maven', 'Java JDK', 'VS Code'],
        software: [
          { name: 'Apache Maven 3.9.11', url: 'https://maven.apache.org/download.cgi', description: 'Build automation tool' },
          { name: 'Java JDK 8+', url: 'https://adoptium.net/', description: 'Required for Maven execution' },
        ],
        manual: `Procedure to Create & Run Maven Project

Step 1: Generate a new Maven project

mvn archetype:generate -DgroupId=com.example -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false


Step 2: Move into the project folder

cd my-app


Step 3: Build the project (compile + test + package)

mvn clean install


Step 4: Run the program

java -cp target/my-app-1.0-SNAPSHOT.jar com.example.App


Output:

Hello World!`,
        description: 'Learn Maven project structure, POM configuration, and test execution.',
      };
    }
    
    // Special case for Experiment 3 - Gradle
    if (n === 3) {
      return {
        id: `exp-${n}`,
        title: `Experiment ${n}: Working with Gradle`,
        subtitle: 'Setting Up a Gradle Project, Understanding Build Scripts (Groovy/Kotlin DSL), Dependency Management and Task Automation',
        video: 'exp-3.mp4',
        thumbnail: 'https://gradle.com/wp-content/uploads/2020/06/gradle-elephant-icon.svg',
        tools: ['Gradle', 'Java JDK', 'VS Code'],
        software: [
          { name: 'Gradle 9.x', url: 'https://gradle.org/install/', description: 'Build tool (install or use wrapper)' },
          { name: 'Java JDK 17+', url: 'https://adoptium.net/', description: 'Required for Gradle execution' },
        ],
        manual: `🛠 Gradle Project Procedure

Step 1: Initialize project

gradle init


👉 Select options:

Type → Application
Language → Java
Java version → 21 (or your version)
Structure → Single application project
DSL → Kotlin (or Groovy)
Test framework → JUnit 4

Step 2: Build project

gradle build


Step 3: Run tests

gradle test


Step 4: Run application

gradle run


Output:

Hello World!`,
        description: 'Initialize, build, test, and run Java apps using Gradle tasks and DSLs.',
      };
    }

    // Special case for Experiment 4 - Maven to Gradle migration
    if (n === 4) {
      return {
        id: `exp-${n}`,
        title: `Experiment ${n}: Practical Exercise — Build and Run Applications`,
        subtitle: 'Build and Run a Java Application with Maven, then migrate the same to Gradle',
        video: 'exp-4.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=600&auto=format&fit=crop',
        tools: ['Maven', 'Gradle', 'Java JDK'],
        software: [
          { name: 'Apache Maven 3.9.11', url: 'https://maven.apache.org/download.cgi', description: 'Build automation tool' },
          { name: 'Gradle 9.x', url: 'https://gradle.org/install/', description: 'Build tool (install or use wrapper)' },
          { name: 'Java JDK 17+', url: 'https://adoptium.net/', description: 'Required for both Maven/Gradle' },
        ],
        manual: `📘 Manual Procedure
🔹 Part A: Build and Run Java Application with Maven

Open terminal / command prompt
Navigate to the folder where you want the project.

Create a Maven project

mvn archetype:generate -DgroupId=com.example -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false


Move into the project folder

cd my-app


Build the project

mvn clean install


Run the application

java -cp target/my-app-1.0-SNAPSHOT.jar com.example.App


✅ Expected Output

Hello World!

🔹 Part B: Migrate the Application to Gradle

Inside the same project (my-app) initialize Gradle

gradle init


Choose options:

Type of build → Application
Language → Java
Java version → 21 (or 8 depending on lab)
DSL → Kotlin (you already have build.gradle.kts)
Test framework → JUnit 4

Edit build.gradle.kts (your modified version):

/*
 * This file was generated by the Gradle 'init' task.
 */

plugins {
    \`java-library\`
    \`maven-publish\`
    \`application\`
}

repositories {
    mavenLocal()
    maven {
        url = uri("https://repo.maven.apache.org/maven2/")
    }
}

dependencies {
    testImplementation("junit:junit:4.13.2")
}

application {
    mainClass.set("com.example.App")
}

group = "com.example"
version = "1.0-SNAPSHOT"
description = "my-app"
java.sourceCompatibility = JavaVersion.VERSION_1_8

publishing {
    publications.create<MavenPublication>("maven") {
        from(components["java"])
    }
}


Build the Gradle project

gradle build


Run the tests

gradle test


Run the application

gradle run


✅ Expected Output

Hello World!`,
        description: 'Practice building with Maven and migrating to Gradle with Kotlin DSL.',
      };
    }
    
    // Default for other experiments
    return {
      id: `exp-${n}`,
      title: `Experiment ${n}: DevOps Program ${n}`,
      subtitle: 'Learn-by-doing with hands-on practice',
      video: videos[i % videos.length].youtubeId,
      tools: ['Git', 'Docker', 'VS Code', 'Kubectl'].slice(0, (i % 4) + 1),
      software: [
        { name: 'Git', url: 'https://git-scm.com/downloads', description: 'Version control system' },
        { name: 'Docker Desktop', url: 'https://www.docker.com/products/docker-desktop/', description: 'Container runtime' },
      ].slice(0, (i % 2) + 1),
      manual: `Procedure for Experiment ${n}:\n1. Step one...\n2. Step two...\n3. Step three...`,
      description: 'Learn-by-doing with a concise walkthrough and references.',
    };
  });

  return { videos, manuals, tools, devopsExperiments };
})();


// Machine Learning Programs (code-only, no video)
window.ML_DATA = (function(){
  const mlExperiments = [
    {
      id: 'ml-1',
      title: '1) Histograms & Box Plots (California Housing)',
      software: [{ name: 'Python', url: 'https://www.python.org/downloads/', description: 'Required to run code' }],
      code: `import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.datasets import fetch_california_housing\n\nhousing_df = fetch_california_housing(as_frame=True).frame\nnum_features = housing_df.select_dtypes(include=[np.number]).columns\n\nfig, axes = plt.subplots(3, 3, figsize=(15, 10))\nfor ax, feature in zip(axes.flatten(), num_features):\n    ax.hist(housing_df[feature], bins=30, color='blue', alpha=0.7)\n    ax.set_title(f'Distribution of {feature}')\nplt.tight_layout(); plt.show()\n\nfig, axes = plt.subplots(3, 3, figsize=(15, 10))\nfor ax, feature in zip(axes.flatten(), num_features):\n    ax.boxplot(housing_df[feature], vert=False, patch_artist=True, boxprops=dict(facecolor='orange'))\n    ax.set_title(f'Box Plot of {feature}')\nplt.tight_layout(); plt.show()\n\nprint("Outliers Detection:")\noutliers_summary = {\n    f: ((housing_df[f] < (q1 := housing_df[f].quantile(0.25)) - 1.5*(iqr := housing_df[f].quantile(0.75)-q1)) | \n        (housing_df[f] > q1+1.5*iqr)).sum()\n    for f in num_features\n}\nfor k, v in outliers_summary.items():\n    print(f"{k}: {v} outliers")\n\nprint("\nDataset Summary:")\nprint(housing_df.describe())`
    },
    {
      id: 'ml-2',
      title: '2) Correlation Matrix, Heatmap & Pair Plot',
      software: [{ name: 'Python', url: 'https://www.python.org/downloads/', description: 'Required to run code' }],
      code: `import seaborn as sns\nimport matplotlib.pyplot as plt\nfrom sklearn.datasets import fetch_california_housing\n\ndata = fetch_california_housing(as_frame=True).frame\n\nsns.heatmap(data.corr(), annot=True, cmap='coolwarm', fmt='.2f', linewidths=0.5,\n            cbar_kws={'shrink': .8})\nplt.title('Correlation Matrix of California Housing Features')\nplt.show()\n\nsns.pairplot(data, diag_kind='kde', plot_kws={'alpha': 0.5})\nplt.suptitle('Pair Plot of California Housing Features', y=1.02)\nplt.show()`
    },
    {
      id: 'ml-3',
      title: '3) PCA on Iris (4D → 2D)',
      software: [{ name: 'Python', url: 'https://www.python.org/downloads/', description: 'Required to run code' }],
      code: `import numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.datasets import load_iris\nfrom sklearn.decomposition import PCA\n\niris = load_iris()\nX, y, names = iris.data, iris.target, iris.target_names\n\nX_pca = PCA(n_components=2).fit_transform(X)\n\ncolors = ['r', 'g', 'b']\nfor i, label in enumerate(np.unique(y)):\n    plt.scatter(X_pca[y == label, 0], X_pca[y == label, 1], c=colors[i], label=names[label])\n\nplt.title('PCA on Iris Dataset')\nplt.xlabel('Principal Component 1')\nplt.ylabel('Principal Component 2')\nplt.legend()\nplt.grid()\nplt.show()`
    },
    {
      id: 'ml-4',
      title: '4) Find-S Algorithm (from CSV)',
      software: [{ name: 'Python', url: 'https://www.python.org/downloads/', description: 'Required to run code' }],
      code: `import pandas as pd\n\ndef find_s(file_path):\n    data = pd.read_csv(file_path)\n    attrs, target = data.columns[:-1], data.columns[-1]\n    hypo = ['?'] * len(attrs)\n\n    for _, row in data.iterrows():\n        if row[target] == 'Yes':\n            hypo = [v if h == '?' or h == v else '?' for h, v in zip(hypo, row[attrs])]\n    return hypo\n\nprint("Final Hypothesis:", find_s('training_data.csv'))`
    },
    {
      id: 'ml-5',
      title: '5) k-NN on 1D synthetic data',
      software: [{ name: 'Python', url: 'https://www.python.org/downloads/', description: 'Required to run code' }],
      code: `import numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.neighbors import KNeighborsClassifier\n\nnp.random.seed(42)\nX = np.random.rand(100, 1)\ny = np.array(['Class1' if xi <= 0.5 else 'Class2' for xi in X.flatten()])\n\nX_train, y_train = X[:50], y[:50]\nX_test, y_test = X[50:], y[50:]\n\nk_values = [1,2,3,4,5,20,30]\nplt.figure(figsize=(12,8))\n\nfor i, k in enumerate(k_values, 1):\n    knn = KNeighborsClassifier(n_neighbors=k).fit(X_train, y_train)\n    y_pred = knn.predict(X_test)\n\n    plt.subplot(3,3,i)\n    plt.scatter(X_test, y_test, color='blue', label='True')\n    plt.scatter(X_test, y_pred, color='red', marker='x', label='Predicted')\n    plt.title(f"k={k}"); plt.xlabel("X"); plt.ylabel("Class"); plt.legend(); plt.grid(True)\n\nplt.tight_layout(); plt.show()\n\nfor k in k_values:\n    acc = KNeighborsClassifier(n_neighbors=k).fit(X_train, y_train).score(X_test, y_test)\n    print(f"Accuracy for k={k}: {acc:.2f}")`
    },
    {
      id: 'ml-6',
      title: '6) Locally Weighted Regression (LWR)',
      software: [{ name: 'Python', url: 'https://www.python.org/downloads/', description: 'Required to run code' }],
      code: `import numpy as np\nimport matplotlib.pyplot as plt\n\ndef gaussian(x, xi, tau):\n    return np.exp(-np.sum((x - xi)**2)/(2*tau**2))\n\ndef lwr(x, X, y, tau):\n    W = np.diag([gaussian(x, xi, tau) for xi in X])\n    theta = np.linalg.inv(X.T @ W @ X) @ X.T @ W @ y\n    return x @ theta\n\nnp.random.seed(42)\nX = np.linspace(0, 2*np.pi, 100)\ny = np.sin(X) + 0.1*np.random.randn(100)\nX_bias = np.c_[np.ones(X.shape), X]\n\nx_test = np.linspace(0, 2*np.pi, 200)\nx_test_bias = np.c_[np.ones(x_test.shape), x_test]\ntau = 0.5\n\ny_pred = np.array([lwr(xi, X_bias, y, tau) for xi in x_test_bias])\n\nplt.figure(figsize=(10,6))\nplt.scatter(X, y, color='red', alpha=0.7, label='Training Data')\nplt.plot(x_test, y_pred, color='blue', linewidth=2, label=f'LWR Fit (tau={tau})')\nplt.xlabel('X'); plt.ylabel('y'); plt.title('Locally Weighted Regression')\nplt.legend(); plt.grid(alpha=0.3); plt.show()`
    },
    {
      id: 'ml-7a',
      title: '7a) Linear Regression (Boston Housing CSV)',
      software: [{ name: 'Python', url: 'https://www.python.org/downloads/', description: 'Required to run code' }],
      code: `import pandas as pd\nimport matplotlib.pyplot as plt\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error, r2_score\n\ndf = pd.read_csv('HousingData.csv').fillna(0)\nX = df[['RM','LSTAT','PTRATIO']]\ny = df['MEDV']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nmodel = LinearRegression().fit(X_train, y_train)\ny_pred = model.predict(X_test)\n\nprint("MSE:", mean_squared_error(y_test, y_pred))\nprint("R2:", r2_score(y_test, y_pred))\n\nplt.scatter(y_test, y_pred)\nplt.xlabel("Actual Prices"); plt.ylabel("Predicted Prices")\nplt.title("Linear Regression - Actual vs Predicted")\nplt.grid(True); plt.show()`
    },
    {
      id: 'ml-7b',
      title: '7b) Polynomial Regression (Auto MPG CSV)',
      software: [{ name: 'Python', url: 'https://www.python.org/downloads/', description: 'Required to run code' }],
      code: `import pandas as pd\nimport matplotlib.pyplot as plt\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.metrics import mean_squared_error, r2_score\n\ndf = pd.read_csv('auto_mpg.csv')\nX = df[['displacement','horsepower','weight','acceleration']]\ny = df['mpg']\n\nX['horsepower'] = pd.to_numeric(X['horsepower'], errors='coerce')\nX.fillna(X.mean(), inplace=True)\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\npoly = PolynomialFeatures(degree=2)\nX_train_poly, X_test_poly = poly.fit_transform(X_train), poly.transform(X_test)\n\nmodel = LinearRegression().fit(X_train_poly, y_train)\ny_pred = model.predict(X_test_poly)\n\nprint("MSE:", mean_squared_error(y_test, y_pred))\nprint("R2:", r2_score(y_test, y_pred))\n\nplt.scatter(y_test, y_pred)\nplt.xlabel("Actual MPG"); plt.ylabel("Predicted MPG")\nplt.title("Polynomial Regression - Actual vs Predicted")\nplt.grid(True); plt.show()`
    },
    {
      id: 'ml-8',
      title: '8) Decision Tree (Breast Cancer)',
      software: [{ name: 'Python', url: 'https://www.python.org/downloads/', description: 'Required to run code' }],
      code: `import numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier, plot_tree\nfrom sklearn.metrics import accuracy_score\n\ndata = load_breast_cancer()\nX, y = data.data, data.target\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nclf = DecisionTreeClassifier(random_state=42).fit(X_train, y_train)\ny_pred = clf.predict(X_test)\n\nprint(f"Model Accuracy: {accuracy_score(y_test, y_pred)*100:.2f}%")\nprint("Predicted Class for first test sample:", "Benign" if clf.predict([X_test[0]])[0] else "Malignant")\n\nplt.figure(figsize=(12,8))\nplot_tree(clf, filled=True, feature_names=data.feature_names, class_names=data.target_names)\nplt.title("Decision Tree - Breast Cancer Dataset"); plt.show()`
    },
    {
      id: 'ml-9',
      title: '9) Naive Bayes (Olivetti Faces)',
      software: [{ name: 'Python 3.10+', url: 'https://www.python.org/downloads/', description: 'Required to run code' }],
      code: `import numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.datasets import fetch_olivetti_faces\nfrom sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.naive_bayes import GaussianNB\nfrom sklearn.metrics import accuracy_score, classification_report, confusion_matrix\n\ndata = fetch_olivetti_faces(shuffle=True, random_state=42)\nX, y = data.data, data.target\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)\n\ngnb = GaussianNB().fit(X_train, y_train)\ny_pred = gnb.predict(X_test)\n\nprint(f'Accuracy: {accuracy_score(y_test, y_pred)*100:.2f}%')\nprint("\nClassification Report:\n", classification_report(y_test, y_pred, zero_division=1))\nprint("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))\nprint(f"\nCross-validation accuracy: {cross_val_score(gnb, X, y, cv=5).mean()*100:.2f}%")\n\nfig, axes = plt.subplots(3,5,figsize=(12,8))\nfor ax, img, t, p in zip(axes.ravel(), X_test, y_test, y_pred):\n    ax.imshow(img.reshape(64,64), cmap='gray'); ax.set_title(f"T:{t},P:{p}"); ax.axis('off')\nplt.show()`
    },
    {
      id: 'ml-10',
      title: '10) K-Means Clustering (Breast Cancer)',
      software: [{ name: 'Python 3.10+', url: 'https://www.python.org/downloads/', description: 'Required to run code' }],
      code: `import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nfrom sklearn.metrics import confusion_matrix, classification_report\n\ndata = load_breast_cancer()\nX, y = data.data, data.target\nX_scaled = StandardScaler().fit_transform(X)\n\nkmeans = KMeans(n_clusters=2, random_state=42)\ny_kmeans = kmeans.fit_predict(X_scaled)\n\nprint("Confusion Matrix:\n", confusion_matrix(y, y_kmeans))\nprint("\nClassification Report:\n", classification_report(y, y_kmeans))\n\nX_pca = PCA(n_components=2).fit_transform(X_scaled)\ndf = pd.DataFrame(X_pca, columns=['PC1','PC2'])\ndf['Cluster'], df['True'] = y_kmeans, y\n\nplt.figure(figsize=(8,6))\nsns.scatterplot(data=df, x='PC1', y='PC2', hue='Cluster', palette='Set1', s=100, edgecolor='black', alpha=0.7)\nplt.title('K-Means Clustering'); plt.show()\n\nplt.figure(figsize=(8,6))\nsns.scatterplot(data=df, x='PC1', y='PC2', hue='True', palette='coolwarm', s=100, edgecolor='black', alpha=0.7)\nplt.title('True Labels'); plt.show()\n\nplt.figure(figsize=(8,6))\nsns.scatterplot(data=df, x='PC1', y='PC2', hue='Cluster', palette='Set1', s=100, edgecolor='black', alpha=0.7)\ncenters = PCA(n_components=2).fit(X_scaled).transform(kmeans.cluster_centers_)\nplt.scatter(centers[:,0], centers[:,1], s=200, c='red', marker='X', label='Centroids')\nplt.title('K-Means with Centroids'); plt.show()`
    }
  ];

  return { mlExperiments };
})();

// Web Technology Programs (code-only, no video)
window.WT_DATA = (function(){
  const wtPrograms = [
    { id: 'wt-1', title: 'My First Webpage', code: `<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>My First Web Page</title>\n  <style>\n    body { font-family: system-ui; background: linear-gradient(#fff5e6, #ffe6e6); color: #222; padding: 24px; }\n    header { color: #d35400; text-align: center; }\n    marquee { font-weight: 700; }\n  </style>\n</head>\n<body>\n  <marquee>Basic HTML Tags</marquee>\n  <header>\n    <h1>Heading 1</h1>\n    <h2>Heading 2</h2>\n  </header>\n  <p>This is a paragraph of text.</p>\n  <hr>\n  <br>\n  <blockquote>This is a block quote.</blockquote>\n  <pre>Preformatted text</pre>\n  <b>Bold</b> <u>Underline</u> <sub>sub</sub> <sup>sup</sup>\n</body>\n</html>` },
    { id: 'wt-2', title: 'Time Table', code: `<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>Time Table</title>\n  <style>\n    body { font-family: system-ui; background: #f7f8fb; padding: 20px; }\n    table { width: 100%; border-collapse: collapse; box-shadow: 0 4px 12px rgba(0, 0, 0, .06); }\n    th, td { border: 1px solid #e2e6ef; padding: 10px; text-align: center; }\n    th { background: #2b2f77; color: #fff; }\n    td.lab { background: #ffecb3; }\n    td.elective { background: #d7e3ff; }\n    tfoot td { background: #f1f4ff; text-align: left; padding: 12px; }\n  </style>\n</head>\n<body>\n  <table>\n    <thead>\n      <tr>\n        <th>Day</th>\n        <th>9:00-10:00</th>\n        <th>10:00-11:00</th>\n        <th>11:00-12:00</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Monday</td>\n        <td class="lab">Lab</td>\n        <td>Math</td>\n        <td>English</td>\n      </tr>\n      <tr>\n        <td>Tuesday</td>\n        <td>Science</td>\n        <td class="elective">Elective</td>\n        <td>History</td>\n      </tr>\n    </tbody>\n    <tfoot>\n      <tr>\n        <td colspan="4">Note: Lab = yellow, Elective = light blue</td>\n      </tr>\n    </tfoot>\n  </table>\n</body>\n</html>` },
    { id: 'wt-3', title: 'External CSS (style.css)', code: `h2 { color: #006d6d; font-size: 1.6rem; }\nh3 { color: #018786; font-size: 1.2rem; }\nhr { border: none; border-top: 2px solid #e6f2f2; }\np { font-size: 1rem; line-height: 1.5; }\ndiv { background: #f2fefc; padding: 16px; border-radius: 8px; }\nspan { font-weight: 700; color: #004d4d; }\ntime { color: #666; font-size: .9rem; }\nimg { border-radius: 8px; border: 1px solid #e0f0ef; padding: 4px; }\na { text-decoration: none; color: #006d6d; }\na:hover { color: #004d4d; }` },
    { id: 'wt-4', title: 'Registration Form', code: `<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>Register</title>\n  <style>\n    body { font-family: Inter, system-ui; background: linear-gradient(180deg, #eef7ff, #ffffff); padding: 28px; color: #123; }\n    form { max-width: 640px; margin: 0 auto; background: rgba(255, 255, 255, .9); padding: 18px; border-radius: 12px; box-shadow: 0 6px 18px rgba(17, 24, 39, .06); }\n    input, select { width: 100%; padding: 10px; margin: 8px 0; border: 1px solid #d7e6ff; border-radius: 6px; }\n    button { background: #0b63d6; color: #fff; padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer; }\n    label { font-weight: 600; }\n  </style>\n</head>\n<body>\n  <form>\n    <table style="width:100%">\n      <tr><th style="text-align:left">Field</th><th style="text-align:left">Input</th></tr>\n      <tr><td><label>Name</label></td><td><input required name="name" type="text"></td></tr>\n      <tr><td><label>Email</label></td><td><input required name="email" type="email"></td></tr>\n      <tr><td><label>Password</label></td><td><input required name="pwd" type="password"></td></tr>\n      <tr><td><label>Country</label></td><td><select name="country"><option>India</option><option>USA</option><option>Other</option></select></td></tr>\n      <tr><td colspan="2" style="text-align:center"><button type="submit">Register</button></td></tr>\n    </table>\n  </form>\n</body>\n</html>` },
    { id: 'wt-5', title: 'Newspaper Layout', code: `<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>Newspaper</title>\n  <style>\n    body { font-family: Georgia, serif; background: #f4f6f8; color: #222; padding: 20px; }\n    header, footer { background: #1f2a44; color: #fff; padding: 12px; border-radius: 8px; text-align: center; }\n    article { background: #fff; padding: 14px; margin: 16px 0; border-radius: 8px; box-shadow: 0 6px 18px rgba(31, 42, 68, .06); }\n    aside { background: #eef2fa; padding: 10px; border-left: 4px solid #cbdff8; }\n  </style>\n</head>\n<body>\n  <header><h1>Campus News</h1></header>\n  <section>\n    <article><h2>Headline</h2><p>Article summary...</p></article>\n    <aside><h4>Sidebar</h4><p>Quick notes and links</p></aside>\n  </section>\n  <footer>© Campus News</footer>\n</body>\n</html>` },
    { id: 'wt-6', title: 'Calculator', code: `<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>Calculator</title>\n  <style>\n    body { font-family: system-ui; background: linear-gradient(135deg, #ffe29f, #ff719a); padding: 24px; }\n    #r { font-weight: 700; margin-top: 12px; }\n  </style>\n</head>\n<body>\n  <h1>Calculator</h1>\n  <input id="n1" type="number" placeholder="Num1">\n  <input id="n2" type="number" placeholder="Num2">\n  <select id="op"><option>+</option><option>-</option><option>*</option><option>/</option><option>^</option><option>sqrt</option><option>sq</option></select>\n  <button id="go">Calc</button>\n  <div id="r"></div>\n  <script>\n    document.getElementById('go').onclick = e => {\n      e.preventDefault();\n      let a = +n1.value, b = +n2.value, op = op.value, res = '';\n      switch(op) {\n        case '+': res = a + b; break;\n        case '-': res = a - b; break;\n        case '*': res = a * b; break;\n        case '/': res = b ? a / b : '∞'; break;\n        case '^': res = Math.pow(a, b); break;\n        case 'sqrt': res = Math.sqrt(a); break;\n        case 'sq': res = a * a; break;\n      }\n      r.textContent = 'Result: ' + res;\n    };\n  </script>\n</body>\n</html>` },
    { id: 'wt-7', title: 'JSON Parsing & Conversion', code: `<!doctype html>\n<html>\n<head><meta charset='utf-8'><title>JSON Demo</title></head>\n<body>\n  <h3>JSON Parse → JS Object</h3>\n  <pre id='o'></pre>\n  <script>\n    let s = '{"name":"John","date":"2022-07-25T14:30:00.000Z"}';\n    let obj = JSON.parse(s);\n    document.getElementById('o').textContent = obj.name + ' | ' + new Date(obj.date);\n    let person = { name: 'Alice', age: 21 };\n    console.log('Object → JSON:', JSON.stringify(person));\n    let arr = [{ name: 'A', age: 20 }, { name: 'B', age: 22 }];\n    let csv = arr.map(r => Object.values(r).join(',')).join('\n');\n    console.log('CSV:\n' + csv);\n  </script>\n</body>\n</html>` },
    { id: 'wt-8', title: 'Node.js Crypto Hash', code: `// Save as hash.js → run: node hash.js\n\nconst crypto = require('crypto');\n\nlet data = 'Hello World';\nlet hash = crypto.createHash('sha256').update(data).digest('hex');\nconsole.log('SHA256 hash:', hash);` },
    { id: 'wt-9', title: 'PHP Visitor Counter', code: `<?php\n$file = 'visitors.txt';\n$visitors = file_exists($file) ? (int)file_get_contents($file) : 0;\n$visitors++;\nfile_put_contents($file, $visitors);\n?>\n<!doctype html>\n<html>\n<head><meta charset='utf-8'><title>Visitor Counter</title></head>\n<body><h1>Total Visitors: <?= htmlspecialchars($visitors) ?></h1></body>\n</html>` },
    { id: 'wt-10', title: 'PHP Selection Sort (Student Records)', code: `<?php\n$students = [\n  ["name" => "Ravi", "marks" => 67],\n  ["name" => "Anita", "marks" => 85],\n  ["name" => "Kiran", "marks" => 45],\n];\n\n$n = count($students);\nfor ($i = 0; $i < $n - 1; $i++) {\n  $min = $i;\n  for ($j = $i + 1; $j < $n; $j++) {\n    if ($students[$j]["marks"] < $students[$min]["marks"]) {\n      $min = $j;\n    }\n  }\n  [$students[$i], $students[$min]] = [$students[$min], $students[$i]];\n}\n\nforeach ($students as $s) {\n  echo $s["name"] . " - " . $s["marks"] . "<br>";\n}\n?>` },
    { id: 'wt-11', title: 'jQuery Append & Animate', code: `<!doctype html>\n<html>\n<head><meta charset='utf-8'><title>jQuery Demo</title><script src='https://code.jquery.com/jquery-3.7.1.min.js'></script><style>#box{width:80px;height:80px;background:#2ecc71;position:relative;}</style></head>\n<body>\n<button id='add'>Append</button> <button id='move'>Animate</button>\n<div id='box'></div>\n<script>$('#add').click(()=>{$('body').append('<p>Added via jQuery</p>');});$('#move').click(()=>{$('#box').animate({left:'200px',opacity:0.5},1000);});</script>\n</body>\n</html>` },
    { id: 'wt-12', title: 'Ajax (Vanilla & jQuery)', code: `<!doctype html>\n<html>\n<head><meta charset='utf-8'><title>Ajax Demo</title><script src='https://code.jquery.com/jquery-3.7.1.min.js'></script></head>\n<body>\n<button id='load'>Load Text (XHR)</button> <button id='jq'>Load JSON (jQuery)</button>\n<pre id='out'></pre>\n<script>document.getElementById('load').onclick=function(){let xhr=new XMLHttpRequest();xhr.open('GET','sample.txt');xhr.onload=()=>out.textContent=xhr.responseText;xhr.send();};$('#jq').click(()=>{$.getJSON('data.json',d=>{$('#out').text(JSON.stringify(d));});});</script>\n</body>\n</html>` },
    { id: 'wt-13', title: 'Resume Website', code: `<!doctype html>\n<html>\n<head><meta charset='utf-8'><title>Resume</title><style>body{font-family:Arial;background:#f4f4f4;padding:20px;}section{background:#fff;margin:10px auto;padding:15px;max-width:700px;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,.05);}</style></head>\n<body>\n<section><h1>John Doe</h1><p>Email: john@example.com | Phone: 9876543210</p></section>\n<section><h2>Education</h2><p>B.E. Computer Science - 2026</p></section>\n<section><h2>Skills</h2><ul><li>Java</li><li>Web Development</li><li>DSA</li></ul></section>\n<section><h2>Projects</h2><p>GitHub Clone, Ecommerce Site, etc.</p></section>\n</body>\n</html>` },
    { id: 'wt-14', title: 'Hosted Registration Page', code: `<!doctype html>\n<html>\n<head><meta charset='utf-8'><title>Web App Registration</title><style>body{font-family:sans-serif;background:#eaf2ff;padding:20px;}form{background:#fff;padding:20px;border-radius:10px;max-width:400px;margin:auto;box-shadow:0 6px 12px rgba(0,0,0,.1);}input{width:100%;margin:8px 0;padding:8px;border:1px solid #ccc;border-radius:6px;}button{background:#0b63d6;color:#fff;border:none;padding:10px;border-radius:6px;cursor:pointer;width:100%;}</style></head>\n<body>\n<form><h2>Register</h2><input type='text' placeholder='Name' required><input type='email' placeholder='Email' required><input type='password' placeholder='Password' required><button type='submit'>Submit</button></form>\n</body>\n</html>` },
  ];

  return { wtPrograms };
})();

// Computer Network Lab (C programs, code-only)
window.CN_DATA = (function(){
  const cnPrograms = [
    { id: 'cn-1', title: 'Echo Client/Server (TCP)', files: {
      'echo_server.c': `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n#include <arpa/inet.h>\n\n#define PORT 12345\n#define SIZE 1024\n\nint main() {\n    int server_fd, new_socket;\n    struct sockaddr_in address;\n    char buffer[SIZE];\n    int addrlen = sizeof(address);\n\n    server_fd = socket(AF_INET, SOCK_STREAM, 0);\n    if (server_fd == -1) { perror("Socket creation failed"); exit(EXIT_FAILURE);}\n\n    address.sin_family = AF_INET;\n    address.sin_addr.s_addr = INADDR_ANY;\n    address.sin_port = htons(PORT);\n\n    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) { perror("Bind failed"); exit(EXIT_FAILURE);}\n    if (listen(server_fd, 3) < 0) { perror("Listen failed"); exit(EXIT_FAILURE);}\n\n    printf("Echo Server listening on port %d...\\n", PORT);\n\n    new_socket = accept(server_fd, (struct sockaddr*)&address, (socklen_t*)&addrlen);\n    if (new_socket < 0) { perror("Accept failed"); exit(EXIT_FAILURE);}\n\n    while (1) {\n        memset(buffer, 0, SIZE);\n        int valread = read(new_socket, buffer, SIZE);\n        if (valread <= 0) break;\n        printf("Received: %s\\n", buffer);\n        send(new_socket, buffer, strlen(buffer), 0);\n    }\n    close(new_socket); close(server_fd); return 0;\n}`,
      'echo_client.c': `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n#include <arpa/inet.h>\n\n#define PORT 12345\n#define SIZE 1024\n\nint main(){\n    int sock=0; struct sockaddr_in serv_addr; char buffer[SIZE];\n    sock = socket(AF_INET, SOCK_STREAM, 0); if(sock<0){perror("Socket creation failed"); exit(EXIT_FAILURE);}\n    serv_addr.sin_family = AF_INET; serv_addr.sin_port = htons(PORT);\n    if(inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr) <= 0){ perror("Invalid address"); exit(EXIT_FAILURE);}\n    if(connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr))<0){ perror("Connection Failed"); exit(EXIT_FAILURE);}\n    printf("Enter a message: "); fgets(buffer, SIZE, stdin); send(sock, buffer, strlen(buffer), 0);\n    memset(buffer,0,SIZE); read(sock, buffer, SIZE); printf("Echo from server: %s\n", buffer); close(sock); return 0;\n}` }},
    { id: 'cn-2', title: 'Chat Client/Server (TCP)', files: {
      'chat_server.c': `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 12346
#define SIZE 1024

int main() {
    int server_fd, new_socket;
    struct sockaddr_in address;
    char buffer[SIZE];
    int addrlen = sizeof(address);

    server_fd = socket(AF_INET, SOCK_STREAM, 0);
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    bind(server_fd, (struct sockaddr*)&address, sizeof(address));
    listen(server_fd, 3);
    printf("Chat Server listening on %d...\n", PORT);

    new_socket = accept(server_fd, (struct sockaddr*)&address, (socklen_t*)&addrlen);
    printf("Client connected.\n");

    while (1) {
        memset(buffer, 0, SIZE);
        int valread = read(new_socket, buffer, SIZE);
        if (valread <= 0) break;
        printf("Client: %s\n", buffer);
        printf("You: ");
        fgets(buffer, SIZE, stdin);
        send(new_socket, buffer, strlen(buffer), 0);
    }

    close(new_socket);
    close(server_fd);
    return 0;
}`,
      'chat_client.c': `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 12346
#define SIZE 1024

int main() {
    int sock = 0;
    struct sockaddr_in serv_addr;
    char buffer[SIZE];

    sock = socket(AF_INET, SOCK_STREAM, 0);
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);

    inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr);
    connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr));

    printf("Chat started. Type your messages...\n");
    while (1) {
        printf("You: ");
        fgets(buffer, SIZE, stdin);
        send(sock, buffer, strlen(buffer), 0);

        memset(buffer, 0, SIZE);
        read(sock, buffer, SIZE);
        printf("Server: %s\n", buffer);
    }

    close(sock);
    return 0;
}` }},
    { id: 'cn-3', title: 'Factorial via TCP', files: {
      'fact_server.c': `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n#include <arpa/inet.h>\n#define PORT 12347\n#define SIZE 1024\nlong factorial(int n){return (n==0||n==1)?1:n*factorial(n-1);}\nint main(){int server_fd,new_socket;struct sockaddr_in address;char buffer[SIZE];int addrlen=sizeof(address);\nserver_fd=socket(AF_INET,SOCK_STREAM,0);address.sin_family=AF_INET;address.sin_addr.s_addr=INADDR_ANY;address.sin_port=htons(PORT);\nbind(server_fd,(struct sockaddr*)&address,sizeof(address));listen(server_fd,3);printf("Factorial Server %d...\\n",PORT);\nnew_socket=accept(server_fd,(struct sockaddr*)&address,(socklen_t*)&addrlen);memset(buffer,0,SIZE);read(new_socket,buffer,SIZE);int n=atoi(buffer);long result=factorial(n);\nsprintf(buffer,"%ld",result);send(new_socket,buffer,strlen(buffer),0);printf("Sent factorial(%d)=%ld\n",n,result);close(new_socket);close(server_fd);return 0;}`,
      'fact_client.c': `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n#include <arpa/inet.h>\n#define PORT 12347\n#define SIZE 1024\nint main(){int sock=0;struct sockaddr_in serv_addr;char buffer[SIZE];sock=socket(AF_INET,SOCK_STREAM,0);serv_addr.sin_family=AF_INET;serv_addr.sin_port=htons(PORT);\ninet_pton(AF_INET,"127.0.0.1",&serv_addr.sin_addr);connect(sock,(struct sockaddr*)&serv_addr,sizeof(serv_addr));printf("Enter a number: ");fgets(buffer,SIZE,stdin);\nsend(sock,buffer,strlen(buffer),0);memset(buffer,0,SIZE);read(sock,buffer,SIZE);printf("Factorial: %s\n",buffer);close(sock);return 0;}` }},
    { id: 'cn-4', title: 'Fibonacci via TCP', files: {
      'fib_server.c': `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n#include <arpa/inet.h>\n#define PORT 12348\n#define SIZE 1024\nvoid fibonacci(int n,int arr[]){arr[0]=0; if(n>1)arr[1]=1; for(int i=2;i<n;i++){arr[i]=arr[i-1]+arr[i-2];}}\nint main(){int server_fd,new_socket;struct sockaddr_in address;char buffer[SIZE];int addrlen=sizeof(address);\nserver_fd=socket(AF_INET,SOCK_STREAM,0);address.sin_family=AF_INET;address.sin_addr.s_addr=INADDR_ANY;address.sin_port=htons(PORT);\nbind(server_fd,(struct sockaddr*)&address,sizeof(address));listen(server_fd,3);printf("Fibonacci Server %d...\\n",PORT);\nnew_socket=accept(server_fd,(struct sockaddr*)&address,(socklen_t*)&addrlen);memset(buffer,0,SIZE);read(new_socket,buffer,SIZE);int n=atoi(buffer);int arr[n];fibonacci(n,arr);\nmemset(buffer,0,SIZE);for(int i=0;i<n;i++){char temp[20];sprintf(temp,"%d ",arr[i]);strcat(buffer,temp);}send(new_socket,buffer,strlen(buffer),0);\nprintf("Sent Fibonacci(%d): %s\n",n,buffer);close(new_socket);close(server_fd);return 0;}`,
      'fib_client.c': `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n#include <arpa/inet.h>\n#define PORT 12348\n#define SIZE 1024\nint main(){int sock=0;struct sockaddr_in serv_addr;char buffer[SIZE];sock=socket(AF_INET,SOCK_STREAM,0);serv_addr.sin_family=AF_INET;serv_addr.sin_port=htons(PORT);\ninet_pton(AF_INET,"127.0.0.1",&serv_addr.sin_addr);connect(sock,(struct sockaddr*)&serv_addr,sizeof(serv_addr));printf("Enter number of terms: ");\nfgets(buffer,SIZE,stdin);send(sock,buffer,strlen(buffer),0);memset(buffer,0,SIZE);read(sock,buffer,SIZE);printf("Fibonacci Series: %s\n",buffer);close(sock);return 0;}` }},
    { id: 'cn-5', title: 'HTTP GET Client', files: {
      'http_client.c': `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n#include <arpa/inet.h>\n#include <netdb.h>\n#define SIZE 4096\nint main(){int sock;struct sockaddr_in server;struct hostent *host;char request[1024],response[SIZE];\nchar hostname[]="example.com"; int port=80; host=gethostbyname(hostname); if(!host){perror("DNS lookup failed"); exit(EXIT_FAILURE);}\nsock=socket(AF_INET,SOCK_STREAM,0); server.sin_family=AF_INET; server.sin_port=htons(port); memcpy(&server.sin_addr, host->h_addr, host->h_length);\nif(connect(sock,(struct sockaddr*)&server,sizeof(server))<0){perror("Connection failed"); exit(EXIT_FAILURE);}\nsprintf(request,"GET / HTTP/1.1\r\nHost: %s\r\nConnection: close\r\n\r\n",hostname); send(sock,request,strlen(request),0);\nwhile(1){int bytes=recv(sock,response,SIZE-1,0); if(bytes<=0)break; response[bytes]='\0'; printf("%s",response);} close(sock); return 0;}` }},
    { id: 'cn-6', title: 'DNS Lookup', files: {
      'dns_lookup.c': `#include <stdio.h>
#include <stdlib.h>
#include <netdb.h>
#include <arpa/inet.h>

int main() {
    char hostname[100];
    struct hostent *host;
    struct in_addr **addr_list;

    printf("Enter hostname: ");
    scanf("%s", hostname);

    host = gethostbyname(hostname);
    if (!host) {
        printf("DNS lookup failed.\n");
        return 1;
    }

    printf("Official name: %s\n", host->h_name);
    addr_list = (struct in_addr **) host->h_addr_list;
    for (int i = 0; addr_list[i] != NULL; i++) {
        printf("IP Address: %s\n", inet_ntoa(*addr_list[i]));
    }

    return 0;
}` }},
    { id: 'cn-7', title: 'File Transfer (TCP)', files: {
      'file_server.c': `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n#include <arpa/inet.h>\n#define PORT 12349\n#define SIZE 1024\nint main(){int server_fd,new_socket;struct sockaddr_in address;char buffer[SIZE];FILE *fp;int addrlen=sizeof(address);\nserver_fd=socket(AF_INET,SOCK_STREAM,0);address.sin_family=AF_INET;address.sin_addr.s_addr=INADDR_ANY;address.sin_port=htons(PORT);\nbind(server_fd,(struct sockaddr*)&address,sizeof(address));listen(server_fd,3);printf("File Server %d...\\n",PORT);\nnew_socket=accept(server_fd,(struct sockaddr*)&address,(socklen_t*)&addrlen); fp=fopen("send.txt","r"); if(!fp){perror("File not found"); exit(EXIT_FAILURE);}\nwhile(fgets(buffer,SIZE,fp)!=NULL){send(new_socket,buffer,strlen(buffer),0); memset(buffer,0,SIZE);} printf("File sent.\\n"); fclose(fp); close(new_socket); close(server_fd); return 0;}`,
      'file_client.c': `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n#include <arpa/inet.h>\n#define PORT 12349\n#define SIZE 1024\nint main(){int sock; struct sockaddr_in serv_addr; char buffer[SIZE]; FILE *fp;\nsock=socket(AF_INET,SOCK_STREAM,0); serv_addr.sin_family=AF_INET; serv_addr.sin_port=htons(PORT); inet_pton(AF_INET,"127.0.0.1", &serv_addr.sin_addr); connect(sock,(struct sockaddr*)&serv_addr,sizeof(serv_addr));\nfp=fopen("recv.txt","w"); if(!fp){perror("File error"); exit(EXIT_FAILURE);} while(1){int n=read(sock,buffer,SIZE); if(n<=0)break; buffer[n]='\0'; fprintf(fp,"%s",buffer); memset(buffer,0,SIZE);} printf("File received.\\n"); fclose(fp); close(sock); return 0;}` }},
    { id: 'cn-8', title: 'Stop-and-Wait ARQ (Sim)', files: { 'stop_and_wait.c': `#include <stdio.h>\n#include <stdlib.h>\n#include <unistd.h>\nint main(){int frames; printf("Enter number of frames to send: "); scanf("%d", &frames); for(int i=1;i<=frames;i++){ printf("Sending Frame %d\n", i); sleep(1); printf("Ack received for Frame %d\n", i);} printf("All frames sent.\n"); return 0;}` }},
    { id: 'cn-9', title: 'CRC Error Detection', files: { 'crc.c': `#include <stdio.h>\n#include <string.h>\n#define N 100\nvoid xr(char *dividend,char *divisor,int pos){ for(int i=0;i<strlen(divisor);i++){ dividend[pos+i]=(dividend[pos+i]==divisor[i])?'0':'1'; } }\nint main(){char data[N],divisor[N],dividend[N],remainder[N]; int data_len,divisor_len; printf("Enter data bits: "); scanf("%s",data); printf("Enter divisor: "); scanf("%s",divisor); data_len=strlen(data); divisor_len=strlen(divisor); strcpy(dividend,data); for(int i=0;i<divisor_len-1;i++) strcat(dividend,"0"); for(int i=0;i<=strlen(dividend)-divisor_len;i++){ if(dividend[i]=='1') xr(dividend,divisor,i);} strcpy(remainder, dividend + strlen(dividend) - (divisor_len - 1)); printf("CRC bits: %s\n", remainder); strcat(data,remainder); printf("Transmitted codeword: %s\n", data); return 0;}` }},
    { id: 'cn-10', title: 'Distance Vector Routing', files: { 'distance_vector.c': `#include <stdio.h>\n#define INF 999\n#define N 10\nint main(){int cost[N][N], dist[N][N], via[N][N]; int nodes; printf("Enter number of nodes: "); scanf("%d", &nodes); printf("Enter cost matrix:\n"); for(int i=0;i<nodes;i++){ for(int j=0;j<nodes;j++){ scanf("%d", &cost[i][j]); cost[i][j]=(cost[i][j]==0 && i!=j)?INF:cost[i][j]; dist[i][j]=cost[i][j]; via[i][j]=j; }} int updated; do{ updated=0; for(int i=0;i<nodes;i++){ for(int j=0;j<nodes;j++){ for(int k=0;k<nodes;k++){ if(dist[i][j] > cost[i][k] + dist[k][j]){ dist[i][j]=cost[i][k]+dist[k][j]; via[i][j]=k; updated=1; }}}}} while(updated); printf("\nDistance Vector Table:\n"); for(int i=0;i<nodes;i++){ for(int j=0;j<nodes;j++){ printf("From %d to %d : Cost = %d via %d\n", i,j,dist[i][j],via[i][j]); }} return 0;}` }},
    { id: 'cn-11', title: 'Link State (Dijkstra per source)', files: { 'link_state.c': `#include <stdio.h>\n#define INF 999\n#define N 10\nint main(){int cost[N][N], dist[N], visited[N]; int nodes, src; printf("Enter number of nodes: "); scanf("%d", &nodes); printf("Enter cost matrix:\n"); for(int i=0;i<nodes;i++){ for(int j=0;j<nodes;j++){ scanf("%d", &cost[i][j]); if(cost[i][j]==0 && i!=j) cost[i][j]=INF; }} printf("Enter source node: "); scanf("%d", &src); for(int i=0;i<nodes;i++){ dist[i]=cost[src][i]; visited[i]=0;} dist[src]=0; visited[src]=1; for(int count=1; count<nodes; count++){ int u=-1,min=INF; for(int i=0;i<nodes;i++){ if(!visited[i] && dist[i]<min){ min=dist[i]; u=i; }} visited[u]=1; for(int v=0; v<nodes; v++){ if(!visited[v] && dist[u]+cost[u][v]<dist[v]){ dist[v]=dist[u]+cost[u][v]; }}} printf("\nShortest distances from node %d:\n", src); for(int i=0;i<nodes;i++){ printf("To %d : %d\n", i, dist[i]); } return 0;}` }},
    { id: 'cn-12', title: 'Leaky Bucket (Sim)', files: { 'leaky_bucket.c': `#include <stdio.h>\nint main(){int bucket_size,output_rate,n,incoming,storage=0; printf("Enter bucket size: "); scanf("%d", &bucket_size); printf("Enter output rate: "); scanf("%d", &output_rate); printf("Enter number of inputs: "); scanf("%d", &n); for(int i=0;i<n;i++){ printf("Enter incoming packet size at time %d: ", i+1); scanf("%d", &incoming); printf("Incoming packet: %d\n", incoming); if(incoming+storage>bucket_size){ printf("Packet loss = %d\n", (incoming+storage)-bucket_size); storage=bucket_size;} else { storage+=incoming; } printf("Bucket before output = %d\n", storage); if(storage<=output_rate) storage=0; else storage-=output_rate; printf("Bucket after output = %d\n\n", storage);} return 0;}` }},
    { id: 'cn-13', title: 'Token Bucket (Sim)', files: { 'token_bucket.c': `#include <stdio.h>\nint main(){int bucket_size,output_rate,n,tokens=0,incoming; printf("Enter bucket size: "); scanf("%d", &bucket_size); printf("Enter output rate: "); scanf("%d", &output_rate); printf("Enter number of inputs: "); scanf("%d", &n); for(int i=0;i<n;i++){ printf("Enter tokens generated at time %d: ", i+1); scanf("%d", &incoming); tokens+=incoming; if(tokens>bucket_size){ printf("Overflow: %d tokens lost\n", tokens-bucket_size); tokens=bucket_size;} printf("Available tokens before transmission = %d\n", tokens); if(tokens>=output_rate){ tokens-=output_rate; printf("Sent %d packets\n", output_rate);} else { printf("Not enough tokens, sent %d packets\n", tokens); tokens=0;} printf("Tokens left = %d\n\n", tokens);} return 0;}` }},
    { id: 'cn-14', title: 'Bellman-Ford', files: { 'bellman_ford.c': `#include <stdio.h>\n#define INF 999\n#define N 10\nint main(){int nodes,edges,src; int u,v,w; int dist[N]; printf("Enter number of nodes and edges: "); scanf("%d %d", &nodes, &edges); int graph[100][3]; printf("Enter edges (u v w):\n"); for(int i=0;i<edges;i++){ scanf("%d %d %d", &graph[i][0], &graph[i][1], &graph[i][2]); } printf("Enter source node: "); scanf("%d", &src); for(int i=0;i<nodes;i++) dist[i]=INF; dist[src]=0; for(int i=0;i<nodes-1;i++){ for(int j=0;j<edges;j++){ u=graph[j][0]; v=graph[j][1]; w=graph[j][2]; if(dist[u]!=INF && dist[u]+w<dist[v]) dist[v]=dist[u]+w; }} printf("\nShortest distances from source %d:\n", src); for(int i=0;i<nodes;i++){ printf("To %d : %d\n", i, dist[i]); } return 0;}` }},
    { id: 'cn-15', title: 'Dijkstra’s Algorithm', files: { 'dijkstra.c': `#include <stdio.h>\n#define INF 999\n#define N 10\nint main(){int cost[N][N],dist[N],visited[N]; int nodes,src; printf("Enter number of nodes: "); scanf("%d", &nodes); printf("Enter cost matrix:\n"); for(int i=0;i<nodes;i++){ for(int j=0;j<nodes;j++){ scanf("%d", &cost[i][j]); if(cost[i][j]==0 && i!=j) cost[i][j]=INF; }} printf("Enter source node: "); scanf("%d", &src); for(int i=0;i<nodes;i++){ dist[i]=cost[src][i]; visited[i]=0;} dist[src]=0; visited[src]=1; for(int count=1; count<nodes-1; count++){ int u=-1,min=INF; for(int i=0;i<nodes;i++){ if(!visited[i] && dist[i]<min){ min=dist[i]; u=i; }} visited[u]=1; for(int v=0; v<nodes; v++){ if(!visited[v] && dist[u]+cost[u][v]<dist[v]) dist[v]=dist[u]+cost[u][v]; }} printf("\nShortest distances from node %d:\n", src); for(int i=0;i<nodes;i++){ printf("To %d : %d\n", i, dist[i]); } return 0;}` }}
  ];

  return { cnPrograms };
})();


