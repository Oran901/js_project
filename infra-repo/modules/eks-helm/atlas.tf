resource "helm_release" "mongodb" {
  name             = "${var.project}-mongodb"
  repository       = "oci://registry-1.docker.io/bitnamicharts"
  chart            = "mongodb"
  version          = "16.4.2"
  namespace        = "mongodb"
  create_namespace = true

  values = [
    <<EOF
metrics:
  enabled: true

auth:
  enabled: false

persistence:
  storageClass: "gp2"
  

initdbScripts:
  init-db.js: |
    db = db.getSiblingDB("test");

    const data = [
        {
            "name": "bananas",
            "qty": 7,
            "rating": 1,
            "microsieverts": 0.1
        },
        {
            "name": "oranges",
            "qty": 6,
            "rating": 2
        },
        {
            "name": "avocados",
            "qty": 3,
            "rating": 5
        },
        {
            "name": "apples",
            "qty": 5,
            "rating": 3
        }
    ];

    data.forEach(item => {
        db.items.updateOne(
            { name: item.name },
            { $setOnInsert: item },
            { upsert: true }
        );
    });
EOF
  ]

  depends_on = [helm_release.ingress-nginx]
}